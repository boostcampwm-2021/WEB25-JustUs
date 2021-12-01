import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";

export function SwaggerUpdateAlbumInfo() {
  return applyDecorators(ApiParam({ name: "albumId", type: Number }), ApiOkResponse({ description: "앨범 수정 성공" }));
}
