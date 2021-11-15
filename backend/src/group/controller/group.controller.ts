import { Body, Controller, Req, Get, HttpCode, Param, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { CustomRequest } from "src/myRequest/customRequest";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { GroupService } from "../service/group.service";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/dto/group/getAlbumsResponse.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(200)
  CreateGroup(@Req() { user }: CustomRequest, @Body() createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    const { userId } = user;
    return this.groupService.createGroup(userId, createGroupRequestDto);
  }

  @Post("/join")
  @HttpCode(200)
  AttendGroup(@Req() { user }: CustomRequest, @Body() attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    const { userId } = user;
    return this.groupService.attendGroup(userId, attendGroupRequestDto);
  }

  @Get("/:groupId")
  GetGroupInfo(@Param("groupId") groupId: number): Promise<GetGroupInfoResponseDto> {
    return this.groupService.getGroupInfo(groupId);
  }

  @Get("/:groupId/albums")
  GetAlbums(@Param("groupId") groupId: number): Promise<GetAlbumsResponseDto> {
    return this.groupService.getAlbums(groupId);
  }

  @Put("/:groupId")
  @HttpCode(200)
  UpdateGroupInfo(
    @Param("groupId") groupId: number,
    @Body() updateGroupInfoRequestDto: UpdateGroupInfoRequestDto,
  ): Promise<string> {
    return this.groupService.updateGroupInfo(groupId, updateGroupInfoRequestDto);
  }

  @Delete("/:groupId")
  LeaveGroup(@Req() { user }: CustomRequest, @Param("groupId") groupId: number): Promise<string> {
    const { userId } = user;
    return this.groupService.leaveGroup(userId, groupId);
  }
}
