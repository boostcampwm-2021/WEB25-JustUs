import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";

export function SwaggerUpdateAlbumOrder() {
  return applyDecorators(
    ApiParam({ name: "groupId", type: Number }),
    ApiOkResponse({ description: "앨범 순서 수정 성공" }),
  );
}
