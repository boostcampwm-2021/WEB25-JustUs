import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { UserService } from "../service/user.service";
import { FindUserResponseDto } from "src/dto/user/userInfoResponse.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:userId")
  getUserInfo(@Param("userId") userId: number): Promise<FindUserResponseDto> {
    return this.userService.findUserInfo(userId);
  }
}
