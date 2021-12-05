import { Body, Req, Get, Param, Post, Put, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { CustomFile } from "src/custom/myFile/customFile";
import { GroupService } from "./group.service";
import { CreateGroupRequestDto } from "src/domain/group/dto/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/domain/group/dto/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/domain/group/dto/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/domain/group/dto/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/domain/group/dto/getAlbumsResponse.dto";
import { UpdateAlbumOrderRequestDto } from "src/domain/group/dto/updateAlbumOrderRequest.dto";
import { CreateGroupResponseDto } from "src/domain/group/dto/createGroupResponse.dto";
import { UpdateGroupInfoResponseDto } from "src/domain/group/dto/updateGroupInfoResponse.dto";
import { GetHashTagsResponseDto } from "src/domain/group/dto/getHashTagsResponse.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/configs";
import {
  SwaggerCreateGroup,
  SwaggerAttendGroup,
  SwaggerGetGroupInfo,
  SwaggerGetAlbums,
  SwaggerUpdateGroupInfo,
  SwaggerLeaveGroup,
  SwaggerUpdateAlbumOrder,
  SwaggerGetHashTags,
} from "./swagger";
import { CustomController } from "src/custom/decorator/controller.decorator";
import { UpdateResult } from "typeorm";

@CustomController("groups", "그룹 API")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseInterceptors(FileInterceptor("groupImage", multerOption))
  @SwaggerCreateGroup()
  async CreateGroup(
    @Req() { user }: CustomRequest,
    @Body() createGroupRequestDto: CreateGroupRequestDto,
    @UploadedFile() file: CustomFile,
  ): Promise<CreateGroupResponseDto> {
    const { userId } = user;
    return await this.groupService.createGroup(userId, file, createGroupRequestDto);
  }

  @Post("/join")
  @SwaggerAttendGroup()
  async AttendGroup(
    @Req() { user }: CustomRequest,
    @Body() attendGroupRequestDto: AttendGroupRequestDto,
  ): Promise<number> {
    const { userId } = user;
    return await this.groupService.attendGroup(userId, attendGroupRequestDto);
  }

  @Get("/:groupId")
  @SwaggerGetGroupInfo()
  async GetGroupInfo(@Param("groupId") groupId: number): Promise<GetGroupInfoResponseDto> {
    return await this.groupService.getGroupInfo(groupId);
  }

  @Get("/:groupId/albums")
  @SwaggerGetAlbums()
  async GetAlbums(@Param("groupId") groupId: number): Promise<GetAlbumsResponseDto> {
    return await this.groupService.getAlbums(groupId);
  }

  @Put("/:groupId")
  @UseInterceptors(FileInterceptor("groupImage", multerOption))
  @SwaggerUpdateGroupInfo()
  async UpdateGroupInfo(
    @Param("groupId") groupId: number,
    @Body() updateGroupInfoRequestDto: UpdateGroupInfoRequestDto,
    @UploadedFile() file: CustomFile,
  ): Promise<UpdateGroupInfoResponseDto> {
    return await this.groupService.updateGroupInfo(groupId, file, updateGroupInfoRequestDto);
  }

  @Delete("/:groupId")
  @SwaggerLeaveGroup()
  async LeaveGroup(@Req() { user }: CustomRequest, @Param("groupId") groupId: number): Promise<boolean> {
    const { userId } = user;
    return await this.groupService.leaveGroup(userId, groupId);
  }

  @Put("/:groupId/albumorder")
  @SwaggerUpdateAlbumOrder()
  async UpdateAlbumOrder(
    @Param("groupId") groupId: number,
    @Body() updateAlbumOrderRequestDto: UpdateAlbumOrderRequestDto,
  ): Promise<UpdateResult> {
    return await this.groupService.updateAlbumOrder(groupId, updateAlbumOrderRequestDto);
  }

  @Get("/:groupId/hashtags")
  @SwaggerGetHashTags()
  async GetHashTags(@Param("groupId") groupId: number): Promise<GetHashTagsResponseDto> {
    return await this.groupService.getHashTags(groupId);
  }
}
