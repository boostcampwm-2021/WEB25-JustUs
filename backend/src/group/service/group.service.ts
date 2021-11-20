import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group.repository";
import { UserRepository } from "src/user/user.repository";
import { AlbumRepository } from "src/album/album.repository";
import { Group } from "../group.entity";
import { CustomFile } from "src/custom/myFile/customFile";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/dto/group/getAlbumsResponse.dto";
import { UpdateAlbumOrderRequestDto } from "src/dto/group/updateAlbumOrderRequest.dto";
import { CreateGroupResponseDto } from "src/dto/group/createGroupResponse.dto";
import { UpdateGroupInfoResponseDto } from "src/dto/group/updateGroupInfoResponse.dto";
import { GetHashTagsResponseDto } from "src/dto/group/getHashTagsResponse.dto";
import { AlbumService } from "src/album/service/album.service";
import { ImageService } from "src/image/service/image.service";

@Injectable()
export class GroupService {
  constructor(
    private albumService: AlbumService,
    private imageService: ImageService,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  async createGroup(
    userId: number,
    file: CustomFile,
    createGroupRequestDto: CreateGroupRequestDto,
  ): Promise<CreateGroupResponseDto> {
    const groupImage = this.imageService.getImageUrl(file);
    const { groupName } = createGroupRequestDto;
    const groupCode = await this.createInvitaionCode();

    const saveObject = groupImage === undefined ? { groupName, groupCode } : { groupImage, groupName, groupCode };

    const group = await this.groupRepository.save(saveObject);
    const { groupId } = group;

    const album = await this.albumRepository.save({
      albumName: "기본 앨범",
      base: true,
      group: group,
    });
    const { albumId } = album;

    await this.groupRepository.update(groupId, { albumOrder: String(albumId) });

    await this.applyUserEntity(userId, groupId, group);

    return { groupId, groupImage };
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
    const { groupId } = group;

    await this.applyUserEntity(userId, groupId, group);

    return group.groupId;
  }

  async applyUserEntity(userId: number, groupId: number, group: Group): Promise<void> {
    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const { groupOrder } = user;
    user.groupOrder = groupOrder === "" ? `${groupId}` : `${groupOrder},${groupId}`;
    user.groups.push(group);
    this.userRepository.save(user);
  }

  async getGroupInfo(groupId: number): Promise<GetGroupInfoResponseDto> {
    const group = await this.groupRepository.getGroupQuery(groupId);
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const { groupCode, users } = group;
    return { groupCode, users };
  }

  async updateGroupInfo(
    groupId: number,
    file: CustomFile,
    updateGroupInfoRequestDto: UpdateGroupInfoRequestDto,
  ): Promise<UpdateGroupInfoResponseDto> {
    const groupImage = this.imageService.getImageUrl(file);
    const { groupName } = updateGroupInfoRequestDto;

    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const updateObject = groupImage === undefined ? { groupName } : { groupImage, groupName };

    this.groupRepository.update(groupId, updateObject);

    return { groupImage };
  }

  async leaveGroup(userId: number, groupId: number): Promise<string> {
    const result = await this.groupRepository.leaveGroupQuery(groupId, userId);
    if (!result.affected) throw new NotFoundException("그룹에 해당 유저가 없습니다.");

    const group = await this.groupRepository.findOne(groupId, { relations: ["users", "albums"] });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);
    const { users } = group;

    if (!users.length) this.groupRepository.softRemove(group);

    const user = await this.userRepository.findOne(userId);
    const { groupOrder } = user;
    const reArrangedOrder = this.reArrangeGroups(groupOrder, groupId);

    await this.userRepository.update(userId, { groupOrder: reArrangedOrder });

    return "Group leave success!!";
  }

  reArrangeGroups(groupOrder: string, groupId: number): string {
    const order = groupOrder.split(",");

    return order.filter(e => +e !== groupId).join(",");
  }

  async getAlbums(groupId: number): Promise<GetAlbumsResponseDto> {
    const albumsInfo = await this.groupRepository.getAlbumsQuery(groupId);
    if (!albumsInfo) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const { albumOrder, albums } = albumsInfo;

    const albumsObject = this.albumService.ArrayToObject(albums);

    const reArrangedAlbums = this.reArrangeAlbums(albumOrder, albumsObject);

    return { albums: reArrangedAlbums };
  }

  reArrangeAlbums(albumOrder: string, albumsObject: object): any[] {
    const order = albumOrder.split(",");

    const orderAlbum = order.map(e => {
      return albumsObject[e];
    });

    return orderAlbum;
  }

  async updateAlbumOrder(groupId: number, updateAlbumOrderRequestDto: UpdateAlbumOrderRequestDto): Promise<string> {
    const { albumOrder } = updateAlbumOrderRequestDto;
    this.groupRepository.update(groupId, { albumOrder });

    return "Album Order update success!!";
  }

  ArrayToObject(groups: Group[]): object {
    const result = groups.reduce((target, key) => {
      target[key.groupId] = key;
      return target;
    }, {});

    return result;
  }

  async getHashTags(groupId: number): Promise<GetHashTagsResponseDto> {
    const group = await this.groupRepository.getHashTagsQuery(groupId);
    console.log(group);

    return new GetHashTagsResponseDto();
  }
}
