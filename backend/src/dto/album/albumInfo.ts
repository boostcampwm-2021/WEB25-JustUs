import { IsNotEmpty, IsString } from "class-validator";

export class AlbumInfo {
  @IsString()
  @IsNotEmpty()
  albumName: string;
}
