import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAlbumResponseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  albumId: number;
}
