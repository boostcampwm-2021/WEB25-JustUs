import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AlbumInfo } from "./albumInfo";

export class CreateAlbumRequestDto extends AlbumInfo {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;
}
