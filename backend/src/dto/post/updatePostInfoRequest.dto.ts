import { IsArray, IsNotEmpty } from "class-validator";
import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostInfoRequestDto extends PostInfo {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [Number] })
  deleteImagesId: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  addImages: string[];
}
