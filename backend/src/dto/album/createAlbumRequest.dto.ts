import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumRequestDto {
  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  @IsString()
  @IsNotEmpty()
  albumName: string;
}
