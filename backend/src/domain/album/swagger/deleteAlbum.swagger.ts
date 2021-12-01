import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";

export function SwaggerDeleteAlbum() {
  return applyDecorators(ApiParam({ name: "albumId", type: Number }), ApiOkResponse({ description: "앨범 삭제 성공" }));
}
