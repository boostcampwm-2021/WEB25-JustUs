import { applyDecorators, Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/domain/auth/guard/jwt-auth-guard";

export function CustomController(controller: string, apiTag: string) {
  return applyDecorators(ApiTags(apiTag), ApiBearerAuth(), UseGuards(JwtAuthGuard), Controller(controller));
}
