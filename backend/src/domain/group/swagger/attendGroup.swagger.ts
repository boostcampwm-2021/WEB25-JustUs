import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function SwaggerAttendGroup() {
  return applyDecorators(ApiResponse({ type: Number, description: "참가한 그룹 ID", status: 200 }));
}
