import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AlbumInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  albumName: string;
}
