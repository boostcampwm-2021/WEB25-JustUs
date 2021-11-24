import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { CreateGroupResponseDto } from "src/dto/group/createGroupResponse.dto";

export function SwaggerCreateGroup() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: CreateGroupRequestDto }),
    ApiResponse({ type: CreateGroupResponseDto, status: 200 }),
  );
}
