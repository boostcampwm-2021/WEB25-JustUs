import { IsArray, IsNotEmpty } from "class-validator";
import { PostInfo } from "./postInfo";

export class UpdatePostInfoRequestDto extends PostInfo {
  @IsArray()
  @IsNotEmpty()
  deleteImagesId: number[];

  @IsArray()
  @IsNotEmpty()
  addImages: string[];
}
