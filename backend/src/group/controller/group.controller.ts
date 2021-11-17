import { Body, Controller, Req, Get, HttpCode, Param, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiParam, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { GroupService } from "../service/group.service";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { GetAlbumsResponseDto } from "src/dto/group/getAlbumsResponse.dto";
import { UpdateAlbumOrderRequestDto } from "src/dto/group/updateAlbumOrderRequest.dto";

@ApiTags("그룹 API")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({ type: Number, description: "생성된 그룹 ID", status: 200 })
  CreateGroup(@Req() { user }: CustomRequest, @Body() createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    const { userId } = user;
    return this.groupService.createGroup(userId, createGroupRequestDto);
  }

  @Post("/join")
  @HttpCode(200)
  @ApiResponse({ type: Number, description: "참가한 그룹 ID", status: 200 })
  AttendGroup(@Req() { user }: CustomRequest, @Body() attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    const { userId } = user;
    return this.groupService.attendGroup(userId, attendGroupRequestDto);
  }

  @Get("/:groupId")
  @ApiParam({ name: "groupId", type: Number })
  @ApiResponse({ type: GetGroupInfoResponseDto, status: 200 })
  GetGroupInfo(@Param("groupId") groupId: number): Promise<GetGroupInfoResponseDto> {
    return this.groupService.getGroupInfo(groupId);
  }

  @Get("/:groupId/albums")
  @ApiParam({ name: "groupId", type: Number })
  @ApiResponse({ type: GetAlbumsResponseDto, status: 200 })
  GetAlbums(@Param("groupId") groupId: number): Promise<GetAlbumsResponseDto> {
    return this.groupService.getAlbums(groupId);
  }

  @Put("/:groupId")
  @HttpCode(200)
  @ApiParam({ name: "groupId", type: Number })
  @ApiOkResponse({ description: "그룹 수정 성공" })
  UpdateGroupInfo(
    @Param("groupId") groupId: number,
    @Body() updateGroupInfoRequestDto: UpdateGroupInfoRequestDto,
  ): Promise<string> {
    return this.groupService.updateGroupInfo(groupId, updateGroupInfoRequestDto);
  }

  @Delete("/:groupId")
  @ApiParam({ name: "groupId", type: Number })
  @ApiOkResponse({ description: "그룹 탈퇴 성공" })
  LeaveGroup(@Req() { user }: CustomRequest, @Param("groupId") groupId: number): Promise<string> {
    const { userId } = user;
    return this.groupService.leaveGroup(userId, groupId);
  }

  @Put("/:groupId/albumorder")
  @HttpCode(200)
  @ApiParam({ name: "groupId", type: Number })
  @ApiOkResponse({ description: "앨범 순서 수정 성공" })
  UpdateAlbumOrder(
    @Param("groupId") groupId: number,
    @Body() updateAlbumOrderRequestDto: UpdateAlbumOrderRequestDto,
  ): Promise<string> {
    return this.groupService.updateAlbumOrder(groupId, updateAlbumOrderRequestDto);
  }
}
