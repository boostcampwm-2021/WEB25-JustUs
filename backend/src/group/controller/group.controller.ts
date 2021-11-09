import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { GroupService } from "../service/group.service";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(200)
  CreateGroup(@Body() createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    return this.groupService.createGroup(createGroupRequestDto);
  }
}
