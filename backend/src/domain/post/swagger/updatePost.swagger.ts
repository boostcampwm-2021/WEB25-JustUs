import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { UpdatePostInfoRequestDto } from "src/domain/post/dto/updatePostInfoRequest.dto";

export function SwaggerUpdatePost() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: UpdatePostInfoRequestDto }),
    ApiParam({ name: "postId", type: Number }),
    ApiOkResponse({ description: "게시글 수정 성공" }),
  );
}
