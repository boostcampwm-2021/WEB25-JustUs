import { applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiParam } from "@nestjs/swagger";
import { GetHashTagsResponseDto } from "src/domain/group/dto/getHashTagsResponse.dto";

export function SwaggerGetHashTags() {
  return applyDecorators(
    ApiParam({ name: "groupId", type: Number }),
    ApiResponse({ type: GetHashTagsResponseDto, status: 200 }),
  );
}
