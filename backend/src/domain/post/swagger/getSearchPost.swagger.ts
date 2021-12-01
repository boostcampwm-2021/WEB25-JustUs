import { applyDecorators } from "@nestjs/common";
import { ApiQuery, ApiResponse } from "@nestjs/swagger";
import { GetSearchPostResponse } from "src/domain/post/dto/getSearchPostResponse.dto";

export function SwaggerGetSearchPost() {
  return applyDecorators(
    ApiQuery({ name: "hashtagId", required: true }),
    ApiResponse({ type: GetSearchPostResponse, status: 200 }),
  );
}
