import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserInfoResponseDto } from "src/domain/user/dto/userInfoResponse.dto";

export function SwaggerGetUserInfo() {
  return applyDecorators(ApiResponse({ type: UserInfoResponseDto, status: 200 }));
}
