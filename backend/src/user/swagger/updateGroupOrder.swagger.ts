import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

export function SwaggerUpdateGroupOrder() {
  return applyDecorators(ApiOkResponse({ description: "그룹 순서 수정 성공" }));
}
