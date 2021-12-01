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

@CustomController("groups", "그룹 API")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseInterceptors(FileInterceptor("groupImage", multerOption))
  @SwaggerCreateGroup()
  CreateGroup(
    @Req() { user }: CustomRequest,
    @Body() createGroupRequestDto: CreateGroupRequestDto,
    @UploadedFile() file: CustomFile,
  ): Promise<CreateGroupResponseDto> {
    const { userId } = user;
    return this.groupService.createGroup(userId, file, createGroupRequestDto);
  }

  @Post("/join")
  @SwaggerAttendGroup()
  AttendGroup(@Req() { user }: CustomRequest, @Body() attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    const { userId } = user;
    return this.groupService.attendGroup(userId, attendGroupRequestDto);
  }

  @Get("/:groupId")
  @SwaggerGetGroupInfo()
  GetGroupInfo(@Param("groupId") groupId: number): Promise<GetGroupInfoResponseDto> {
    return this.groupService.getGroupInfo(groupId);
  }

  @Get("/:groupId/albums")
  @SwaggerGetAlbums()
  GetAlbums(@Param("groupId") groupId: number): Promise<GetAlbumsResponseDto> {
    return this.groupService.getAlbums(groupId);
  }

  @Put("/:groupId")
  @UseInterceptors(FileInterceptor("groupImage", multerOption))
  @SwaggerUpdateGroupInfo()
  UpdateGroupInfo(
    @Param("groupId") groupId: number,
    @Body() updateGroupInfoRequestDto: UpdateGroupInfoRequestDto,
    @UploadedFile() file: CustomFile,
  ): Promise<UpdateGroupInfoResponseDto> {
    return this.groupService.updateGroupInfo(groupId, file, updateGroupInfoRequestDto);
  }

  @Delete("/:groupId")
  @SwaggerLeaveGroup()
  LeaveGroup(@Req() { user }: CustomRequest, @Param("groupId") groupId: number): Promise<string> {
    const { userId } = user;
    return this.groupService.leaveGroup(userId, groupId);
  }

  @Put("/:groupId/albumorder")
  @SwaggerUpdateAlbumOrder()
  UpdateAlbumOrder(
    @Param("groupId") groupId: number,
    @Body() updateAlbumOrderRequestDto: UpdateAlbumOrderRequestDto,
  ): Promise<string> {
    return this.groupService.updateAlbumOrder(groupId, updateAlbumOrderRequestDto);
  }

  @Get("/:groupId/hashtags")
  @SwaggerGetHashTags()
  GetHashTags(@Param("groupId") groupId: number): Promise<GetHashTagsResponseDto> {
    return this.groupService.getHashTags(groupId);
  }
}
