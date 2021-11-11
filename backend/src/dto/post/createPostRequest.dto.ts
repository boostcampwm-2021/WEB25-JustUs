import { IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { PostInfo } from "./postInfo";

export class CreatePostRequestDto extends PostInfo {
  @IsArray()
  @IsNotEmpty()
  postImages: string[];

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  albumId: number;
}
