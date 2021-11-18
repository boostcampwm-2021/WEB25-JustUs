import { IsNotEmpty, IsNumber } from "class-validator";
import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreatePostRequestDto extends PostInfo {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  groupId: number;

  @ApiProperty({ type: ["file"] })
  postImages: any[];
}
