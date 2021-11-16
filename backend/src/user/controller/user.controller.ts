import { Controller, Req, Get, Put, Body, UseGuards, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { UserService } from "../service/user.service";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/dto/user/updateUserInfoRequest.dto";

@ApiTags("유저 API")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ type: UserInfoResponseDto, status: 200 })
  GetUserInfo(@Req() { user }: CustomRequest): Promise<UserInfoResponseDto> {
    const { userId } = user;
    return this.userService.getUserInfo(userId);
  }

  @Put()
  @HttpCode(200)
  @ApiOkResponse({ description: "유저정보 수정 성공" })
  UpdateUserInfo(
    @Req() { user }: CustomRequest,
    @Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto,
  ): Promise<string> {
    const { userId } = user;
    return this.userService.updateUserInfo(userId, updateUserInfoRequestDto);
  }
}
