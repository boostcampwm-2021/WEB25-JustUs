import { ApiProperty } from "@nestjs/swagger";

export class CreateAlbumResponseDto {
  @ApiProperty()
  albumId: number;
}
