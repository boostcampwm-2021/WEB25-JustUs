import { IsNotEmpty, IsString } from "class-validator";

export class ImageInfo {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
