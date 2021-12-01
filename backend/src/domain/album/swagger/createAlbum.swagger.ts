import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { CreateAlbumResponseDto } from "src/domain/album/dto/createAlbumResponse.dto";

export function SwaggerCreateAlbum() {
  return applyDecorators(ApiResponse({ type: CreateAlbumResponseDto, status: 200 }));
}
