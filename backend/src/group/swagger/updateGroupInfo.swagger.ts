import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UpdateGroupInfoRequestDto } from "src/dto/group/updateGroupInfoRequest.dto";
import { UpdateGroupInfoResponseDto } from "src/dto/group/updateGroupInfoResponse.dto";

export function SwaggerUpdateGroupInfo() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: UpdateGroupInfoRequestDto }),
    ApiParam({ name: "groupId", type: Number }),
    ApiResponse({ type: UpdateGroupInfoResponseDto, status: 200 }),
  );
}
