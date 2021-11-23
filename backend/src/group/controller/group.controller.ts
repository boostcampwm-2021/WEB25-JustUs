import { Body, Req, Get, Param, Post, Put, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { CustomFile } from "src/custom/myFile/customFile";
import { GroupService } from "../service/group.service";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/dto/group/getAlbumsResponse.dto";
import { UpdateAlbumOrderRequestDto } from "src/dto/group/updateAlbumOrderRequest.dto";
import { CreateGroupResponseDto } from "src/dto/group/createGroupResponse.dto";
import { UpdateGroupInfoResponseDto } from "src/dto/group/updateGroupInfoResponse.dto";
import { GetHashTagsResponseDto } from "src/dto/group/getHashTagsResponse.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/image/service/image.service";
import {
  SwaggerCreateGroup,
  SwaggerAttendGroup,
  SwaggerGetGroupInfo,
  SwaggerGetAlbums,
  SwaggerUpdateGroupInfo,
  SwaggerLeaveGroup,
  SwaggerUpdateAlbumOrder,
  SwaggerGetHashTags,
} from "../swagger";
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
