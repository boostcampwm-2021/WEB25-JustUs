import { IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostRequestDto extends PostInfo {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  postImages: string[];

  //@IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  albumId: number;
}
