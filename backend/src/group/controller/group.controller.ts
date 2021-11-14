import { Body, Controller, Get, HttpCode, Param, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { GroupService } from "../service/group.service";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { LeaveGroupDto } from "src/dto/group/leaveGroupRequest.dto";
import { GetAlbumsResponseDto } from "src/dto/group/getAlbumsResponse.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(200)
  CreateGroup(@Body() createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    return this.groupService.createGroup(createGroupRequestDto);
  }

  @Post("/join")
  @HttpCode(200)
  AttendGroup(@Body() attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    return this.groupService.attendGroup(attendGroupRequestDto);
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
  LeaveGroup(@Param("groupId") groupId: number, @Body() leaveGroupDto: LeaveGroupDto): Promise<string> {
    return this.groupService.leaveGroup(groupId, leaveGroupDto);
  }
}
