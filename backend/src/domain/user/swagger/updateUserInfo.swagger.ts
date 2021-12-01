import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";
import { UpdateUserInfoRequestDto } from "src/domain/user/dto/updateUserInfoRequest.dto";
import { UpdateUserInfoResponseDto } from "src/domain/user/dto/updateUserInfoResponse.dto";

export function SwaggerUpdateUserInfo() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: UpdateUserInfoRequestDto }),
    ApiResponse({ type: UpdateUserInfoResponseDto, status: 200 }),
  );
}
