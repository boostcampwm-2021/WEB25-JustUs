import { Controller, Get, Param, Put, Body, UseGuards, HttpCode } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { UserService } from "../service/user.service";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/dto/user/updateUserInfoRequest.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:userId")
  getUserInfo(@Param("userId") userId: number): Promise<UserInfoResponseDto> {
    return this.userService.findUserInfo(userId);
  }

  @Put()
  @HttpCode(200)
  updateUserInfo(@Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto): Promise<string> {
    return this.userService.updateUserInfo(updateUserInfoRequestDto);
  }
}
