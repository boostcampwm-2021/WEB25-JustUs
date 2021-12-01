import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";

export function SwaggerGetUserInfo() {
  return applyDecorators(ApiResponse({ type: UserInfoResponseDto, status: 200 }));
}
