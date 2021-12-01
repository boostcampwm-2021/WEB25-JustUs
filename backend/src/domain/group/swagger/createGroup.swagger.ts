import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";
import { CreateGroupRequestDto } from "src/domain/group/dto/createGroupRequest.dto";
import { CreateGroupResponseDto } from "src/domain/group/dto/createGroupResponse.dto";

export function SwaggerCreateGroup() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: CreateGroupRequestDto }),
    ApiResponse({ type: CreateGroupResponseDto, status: 200 }),
  );
}
