import { applyDecorators } from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import { GetAlbumsResponseDto } from "src/domain/group/dto/getAlbumsResponse.dto";

export function SwaggerGetAlbums() {
  return applyDecorators(
    ApiParam({ name: "groupId", type: Number }),
    ApiResponse({ type: GetAlbumsResponseDto, status: 200 }),
  );
}
