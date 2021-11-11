import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group.repository";
import { UserRepository } from "src/user/user.repository";
import { Group } from "../group.entity";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";

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
    const group = await this.groupRepository
      .createQueryBuilder("group")
      .leftJoin("group.users", "user")
      .select(["group.groupCode", "user.profileImage", "user.userNickname", "user.userEmail"])
      .where("group.groupId = :id", { id: groupId })
      .getOne();

    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const { groupCode, users } = group;
    return { groupCode, users };
  }
}
