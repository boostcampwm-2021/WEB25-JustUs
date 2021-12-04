import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "./group.repository";
import { Group } from "./group.entity";
import { CustomFile } from "src/custom/myFile/customFile";
import { CreateGroupRequestDto } from "src/domain/group/dto/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/domain/group/dto/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/domain/group/dto/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/domain/group/dto/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/domain/group/dto/getAlbumsResponse.dto";
import { UpdateAlbumOrderRequestDto } from "src/domain/group/dto/updateAlbumOrderRequest.dto";
import { CreateGroupResponseDto } from "src/domain/group/dto/createGroupResponse.dto";
import { UpdateGroupInfoResponseDto } from "src/domain/group/dto/updateGroupInfoResponse.dto";
import { GetHashTagsResponseDto } from "src/domain/group/dto/getHashTagsResponse.dto";
import { getImageUrl } from "src/util/imageUrl";
import { User } from "src/domain/user/user.entity";
import { Connection, QueryRunner, UpdateResult } from "typeorm";
import { Album } from "src/domain/album/album.entity";
import { ArrayToObject, reArrange, deleteOrder } from "src/util/changeObject";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    private readonly connection: Connection,
  ) {}

  async createGroup(
    userId: number,
    file: CustomFile,
    createGroupRequestDto: CreateGroupRequestDto,
  ): Promise<CreateGroupResponseDto> {
    const groupImage = getImageUrl(file);
    const { groupName } = createGroupRequestDto;
    const groupCode = await this.createInvitaionCode();

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      const group = await queryRunner.manager
        .getRepository(Group)
        .save(Group.toEntity(groupImage, groupName, groupCode));
      const { groupId } = group;

      const album = await queryRunner.manager.getRepository(Album).save(Album.toEntity("기본 앨범", true, group));
      const { albumId } = album;

      queryRunner.manager.getRepository(Group).update(groupId, { albumOrder: String(albumId) });

      await this.applyUserEntity(userId, groupId, group, false, queryRunner);

      await queryRunner.commitTransaction();

      return CreateGroupResponseDto.returnDto(group);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
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

    const group = await this.groupRepository.findOne({ groupCode: code }, { relations: ["users"] });
    if (!group) throw new NotFoundException(`Not found group with the code ${code}`);
    const { groupId } = group;

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await this.applyUserEntity(userId, groupId, group, true, queryRunner);

      await queryRunner.commitTransaction();

      return group.groupId;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async applyUserEntity(
    userId: number,
    groupId: number,
    group: Group,
    attend: boolean,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const user = await queryRunner.manager.getRepository(User).findOne(userId, { relations: ["groups"] });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const { users } = group;
    if (attend && this.hasUser(userId, users)) throw new UnauthorizedException("You are already a member of a group.");

    const { groupOrder } = user;
    user.groupOrder = groupOrder === "" ? `${groupId}` : `${groupOrder},${groupId}`;
    user.groups.push(group);

    await queryRunner.manager.getRepository(User).save(user);
  }

  hasUser(userId: number, users: User[]): boolean {
    return users.some(user => user.userId === userId);
  }

  async getGroupInfo(groupId: number): Promise<GetGroupInfoResponseDto> {
    const group = await this.groupRepository.getGroupQuery(groupId);
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    return GetGroupInfoResponseDto.returnDto(group);
  }

  async updateGroupInfo(
    groupId: number,
    file: CustomFile,
    updateGroupInfoRequestDto: UpdateGroupInfoRequestDto,
  ): Promise<UpdateGroupInfoResponseDto> {
    const groupImage = getImageUrl(file);
    const { groupName, clearImage } = updateGroupInfoRequestDto;

    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const checkClearImage =
      clearImage === 1
        ? { groupImage: process.env.JUSTUS_GROUP_BASE_IMG, groupName }
        : { groupImage: group.groupImage, groupName };
    const updateObject = groupImage === undefined ? checkClearImage : { groupImage, groupName };

    this.groupRepository.update(groupId, updateObject);

    return UpdateGroupInfoResponseDto.returnDto(updateObject.groupImage);
  }

  async leaveGroup(userId: number, groupId: number): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.getCustomRepository(GroupRepository).leaveGroupQuery(groupId, userId);
      if (!result.affected) throw new NotFoundException("그룹에 해당 유저가 없습니다.");

      const group = await queryRunner.manager.getRepository(Group).findOne(groupId, { relations: ["users"] });
      if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);
      const { users } = group;

      if (!users.length) await queryRunner.manager.getRepository(Group).softRemove(group);

      const user = await queryRunner.manager.getRepository(User).findOne(userId);
      const { groupOrder } = user;
      const reArrangedOrder = deleteOrder(groupOrder, groupId);

      queryRunner.manager.getRepository(User).update(userId, { groupOrder: reArrangedOrder });

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getAlbums(groupId: number): Promise<GetAlbumsResponseDto> {
    const albumsInfo = await this.groupRepository.getAlbumsQuery(groupId);
    if (!albumsInfo) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const { albumOrder, albums } = albumsInfo;

    const albumsObject = ArrayToObject(albums, "albumId");

    const reArrangedAlbums = reArrange(albumOrder, albumsObject);

    return GetAlbumsResponseDto.returnDto(reArrangedAlbums);
  }

  async updateAlbumOrder(
    groupId: number,
    updateAlbumOrderRequestDto: UpdateAlbumOrderRequestDto,
  ): Promise<UpdateResult> {
    const { albumOrder } = updateAlbumOrderRequestDto;
    return this.groupRepository.update(groupId, { albumOrder });
  }

  async getHashTags(groupId: number): Promise<GetHashTagsResponseDto> {
    const result = await this.groupRepository.getHashTagsQuery(groupId);

    return result === undefined ? { hashtags: [] } : { hashtags: result.hashtags };
  }
}
