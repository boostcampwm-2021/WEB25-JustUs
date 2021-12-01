import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";

export function SwaggerLeaveGroup() {
  return applyDecorators(ApiParam({ name: "groupId", type: Number }), ApiOkResponse({ description: "그룹 탈퇴 성공" }));
}
