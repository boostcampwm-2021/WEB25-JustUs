import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsArray } from "class-validator";

class hashTagList {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  hashtagId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hashtagContent: string;
}

export class GetHashTagsResponseDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [hashTagList] })
  hashtags: hashTagList[];
}
