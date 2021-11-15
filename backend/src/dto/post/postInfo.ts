import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postTitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  postContent: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postLocation: string;

  //@IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postLatitude: number;

  //@IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postLongitude: number;
}
