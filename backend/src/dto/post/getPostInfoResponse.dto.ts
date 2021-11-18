import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ImageInfo } from "../image/imageInfo";
import { ApiProperty } from "@nestjs/swagger";

export class GetPostInfoResponseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userNickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postTitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  postContent: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [ImageInfo] })
  images: ImageInfo[];

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  postDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postLongitude: number;
}
