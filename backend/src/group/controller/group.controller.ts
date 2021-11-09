import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { GroupService } from "../service/group.service";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";

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
}
