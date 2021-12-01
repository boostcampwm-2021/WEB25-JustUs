import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";

export function SwaggerCreatePost() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: CreatePostRequestDto }),
    ApiResponse({ type: Number, description: "생성된 게시글 ID", status: 200 }),
  );
}
