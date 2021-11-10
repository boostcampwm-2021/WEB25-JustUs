import { IsNotEmpty, IsNumber } from "class-validator";
import { AlbumInfo } from "./albumInfo";

export class CreateAlbumRequestDto extends AlbumInfo {
  @IsNumber()
  @IsNotEmpty()
  groupId: number;
}
