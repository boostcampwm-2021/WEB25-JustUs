import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

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

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  postLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  postLongitude: number;
}
