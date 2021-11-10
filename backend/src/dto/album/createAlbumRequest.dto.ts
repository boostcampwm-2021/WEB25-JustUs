import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumRequestDto {
  @IsString()
  @IsNotEmpty()
  albumName: string;
}
