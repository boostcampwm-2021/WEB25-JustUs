import { IsNotEmpty } from "class-validator";
import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostRequestDto extends PostInfo {
  //@IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  albumId: number;
}
