import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class UpdatePostInfoRequestDto extends PostInfo {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: [Number] })
  deleteImagesId: number[];

  @IsOptional()
  @ApiProperty({ type: ["file"] })
  addImages: any[];
}
