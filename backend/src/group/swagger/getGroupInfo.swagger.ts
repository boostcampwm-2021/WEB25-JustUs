import { applyDecorators } from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import { GetGroupInfoResponseDto } from "src/dto/group/getGroupInfoResponse.dto";

export function SwaggerGetGroupInfo() {
  return applyDecorators(
    ApiParam({ name: "groupId", type: Number }),
    ApiResponse({ type: GetGroupInfoResponseDto, status: 200 }),
  );
}
