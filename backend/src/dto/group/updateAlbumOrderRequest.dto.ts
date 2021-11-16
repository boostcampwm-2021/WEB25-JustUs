import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAlbumOrderRequestDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  albumOrder: string;
}
