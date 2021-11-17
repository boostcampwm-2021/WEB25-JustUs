import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteAlbumRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;
}
