import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group.repository";
import { UserRepository } from "src/user/user.repository";
import { AlbumRepository } from "src/album/album.repository";
import { Group } from "../group.entity";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/dto/group/getAlbumsResponse.dto";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  async createGroup(userId: number, createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    const { groupImage, groupName } = createGroupRequestDto;
    const groupCode = await this.createInvitaionCode();

    const group = await this.groupRepository.save({
      groupImage: groupImage,
      groupName: groupName,
      groupCode: groupCode,
    });

    this.albumRepository.save({
      albumName: "기본 앨범",
      base: true,
      group: group,
    });

    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);
    user.groups.push(group);
    this.userRepository.save(user);

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

  async attendGroup(userId: number, attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    const { code } = attendGroupRequestDto;

    const group = await this.groupRepository.findOne({ groupCode: code });
    if (!group) throw new NotFoundException(`Not found group with the code ${code}`);

    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    user.groups.push(group);
    this.userRepository.save(user);

    return group.groupId;
  }

  async getGroupInfo(groupId: number): Promise<GetGroupInfoResponseDto> {
    const group = await this.groupRepository.getGroupQuery(groupId);
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const { groupCode, users } = group;
    return { groupCode, users };
  }

  async updateGroupInfo(groupId: number, updateGroupInfoRequestDto: UpdateGroupInfoRequestDto): Promise<string> {
    const { groupImage, groupName } = updateGroupInfoRequestDto;

    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    group.groupImage = groupImage;
    group.groupName = groupName;
    this.groupRepository.save(group);

    return "GroupInfo update success!!";
  }

  async leaveGroup(userId: number, groupId: number): Promise<string> {
    const result = await this.groupRepository.leaveGroupQuery(groupId, userId);
    if (!result.affected) throw new NotFoundException("그룹에 해당 유저가 없습니다.");

    const group = await this.groupRepository.findOne(groupId, { relations: ["users", "albums"] });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);
    const { users } = group;

    if (!users.length) this.groupRepository.softRemove(group);

    return "Group leave success!!";
  }

  async getAlbums(groupId: number): Promise<GetAlbumsResponseDto> {
    const albumsInfo = await this.groupRepository.getAlbumsQuery(groupId);
    if (!albumsInfo) throw new NotFoundException(`Not found group with the id ${groupId}`);

    return albumsInfo;
  }
}
