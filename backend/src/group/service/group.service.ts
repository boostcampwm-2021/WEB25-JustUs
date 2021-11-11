import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group.repository";
import { UserRepository } from "src/user/user.repository";
import { Group } from "../group.entity";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { LeaveGroupDto } from "src/dto/group/leaveGroupRequest.dto";
import { DeleteResult } from "typeorm";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createGroup(createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    const { userId, groupImage, groupName } = createGroupRequestDto;
    const groupCode = await this.createInvitaionCode();

    const group = await this.groupRepository.save({
      groupImage: groupImage,
      groupName: groupName,
      groupCode: groupCode,
    });

    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });
    user.groups.push(group);
    await this.userRepository.save(user);

    return group.groupId;
  }

  async createInvitaionCode(): Promise<string> {
    let code: string;
    let exists: Group;
    do {
      code = Math.random().toString(36).substr(2, 11);
      exists = await this.groupRepository.findOne({ groupCode: code });
    } while (exists);

    return code;
  }

  async attendGroup(attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    const { userId, code } = attendGroupRequestDto;

    const group = await this.groupRepository.findOne({ groupCode: code });
    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });

    user.groups.push(group);
    await this.userRepository.save(user);

    return group.groupId;
  }

  async getGroupInfo(groupId: number): Promise<GetGroupInfoResponseDto> {
    const group = await this.readGroupQuery(groupId);
    if (!group) throw new NotFoundException("Not found group with the id " + groupId);

    const { groupCode, users } = group;
    return { groupCode, users };
  }

  async updateGroupInfo(groupId: number, updateGroupInfoRequestDto: UpdateGroupInfoRequestDto): Promise<string> {
    const { groupImage, groupName } = updateGroupInfoRequestDto;

    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException("Can not find Group");

    group.groupImage = groupImage;
    group.groupName = groupName;
    await this.groupRepository.save(group);

    return "GroupInfo update success!!";
  }

  async leaveGroup(groupId: number, leaveGroupDto: LeaveGroupDto): Promise<string> {
    const { userId } = leaveGroupDto;

    const result = await this.leaveGroupQuery(groupId, userId);
    if (!result.affected) throw new NotFoundException("그룹에 해당 유저가 없습니다.");

    const group = await this.readGroupQuery(groupId);
    const { users } = group;

    if (!users.length) await this.groupRepository.softDelete({ groupId });

    return "Group leave success!!";
  }

  async readGroupQuery(groupId: number): Promise<Group> {
    return await this.groupRepository
      .createQueryBuilder("group")
      .leftJoin("group.users", "user")
      .select(["group.groupCode", "user.profileImage", "user.userNickname", "user.userEmail"])
      .where("group.groupId = :id", { id: groupId })
      .getOne();
  }

  async leaveGroupQuery(groupId: number, userId: number): Promise<DeleteResult> {
    return await this.groupRepository
      .createQueryBuilder()
      .delete()
      .from("users_groups_TB")
      .where("groups_tb_group_id = :groupId AND users_user_id = :userId", { groupId: groupId, userId: userId })
      .execute();
  }
}
