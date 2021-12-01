import { PostInfo } from "./postInfo";
import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdatePostInfoRequestDto extends PostInfo {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: [Number] })
  deleteImagesId: number[];

  @IsOptional()
  @ApiProperty({ type: ["file"] })
  addImages: any[];

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  groupId: number;
}
