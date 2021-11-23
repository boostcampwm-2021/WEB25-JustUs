import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { GetGroupsResponseDto } from "src/dto/user/getGroupsResponse.dto";

export function SwaggerGetGroups() {
  return applyDecorators(ApiResponse({ type: GetGroupsResponseDto, status: 200 }));
}
