import { IsArray, IsNotEmpty } from "class-validator";
import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdatePostInfoRequestDto extends PostInfo {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ type: [Number] })
  deleteImagesId: number[];
}
