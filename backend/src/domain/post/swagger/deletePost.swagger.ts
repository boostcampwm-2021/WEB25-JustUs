import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";

export function SwaggerDeletePost() {
  return applyDecorators(
    ApiParam({ name: "postId", type: Number }),
    ApiOkResponse({ description: "게시글 삭제 성공" }),
  );
}
