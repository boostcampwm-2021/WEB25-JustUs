import { Controller, Req, Get, Put, Body, UseGuards, HttpCode, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { CustomFile } from "src/custom/myFile/customFile";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { UserService } from "../service/user.service";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/dto/user/updateUserInfoRequest.dto";
import { UpdateGroupOrderRequestDto } from "src/dto/user/updateGroupOrderRequest.dto";
import { GetGroupsResponseDto } from "src/dto/user/getGroupsResponse.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/image/service/image.service";

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
  @UseInterceptors(FileInterceptor("profileImage", multerOption))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateUserInfoRequestDto })
  @ApiOkResponse({ description: "유저정보 수정 성공" })
  UpdateUserInfo(
    @Req() { user }: CustomRequest,
    @Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto,
    @UploadedFile() file: CustomFile,
  ): Promise<string> {
    const { userId } = user;

    return this.userService.updateUserInfo(userId, file, updateUserInfoRequestDto);
  }

  @Put("/grouporder")
  @HttpCode(200)
  @ApiOkResponse({ description: "그룹 순서 수정 성공" })
  UpdateGroupOrder(
    @Req() { user }: CustomRequest,
    @Body() updateGroupOrderRequestDto: UpdateGroupOrderRequestDto,
  ): Promise<string> {
    const { userId } = user;
    return this.userService.updateGroupOrder(userId, updateGroupOrderRequestDto);
  }

  @Get("groups")
  @ApiResponse({ type: GetGroupsResponseDto, status: 200 })
  GetGroups(@Req() { user }: CustomRequest): Promise<GetGroupsResponseDto> {
    const { userId } = user;
    return this.userService.getGroups(userId);
  }
}
