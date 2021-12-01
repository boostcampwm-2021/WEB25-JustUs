import { applyDecorators } from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import { GetPostInfoResponseDto } from "src/domain/post/dto/getPostInfoResponse.dto";

export function SwaggerGetPostInfo() {
  return applyDecorators(
    ApiParam({ name: "postId", type: Number }),
    ApiResponse({ type: GetPostInfoResponseDto, status: 200 }),
  );
}
