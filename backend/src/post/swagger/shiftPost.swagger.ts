import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";

export function SwaggerShiftPost() {
  return applyDecorators(
    ApiParam({ name: "postId", type: Number }),
    ApiOkResponse({ description: "게시글 이동 성공" }),
  );
}
