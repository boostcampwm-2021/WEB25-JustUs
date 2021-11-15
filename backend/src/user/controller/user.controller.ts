import { Controller, Get, Param, Put, Body, UseGuards, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiParam, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { UserService } from "../service/user.service";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/dto/user/updateUserInfoRequest.dto";

@ApiTags("유저 API")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:userId")
  @ApiParam({ name: "userId", type: Number })
  @ApiResponse({ type: UserInfoResponseDto, status: 200 })
  GetUserInfo(@Param("userId") userId: number): Promise<UserInfoResponseDto> {
    return this.userService.getUserInfo(userId);
  }

  @Put("/:userId")
  @HttpCode(200)
  @ApiParam({ name: "userId", type: Number })
  @ApiOkResponse({ description: "유저정보 수정 성공" })
  UpdateUserInfo(
    @Param("userId") userId: number,
    @Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto,
  ): Promise<string> {
    return this.userService.updateUserInfo(userId, updateUserInfoRequestDto);
  }
}
