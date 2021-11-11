import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ImageInfo } from "../image/imageInfo";

export class GetPostInfoResponseDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  userNickname: string;

  @IsString()
  @IsNotEmpty()
  postTitle: string;

  @IsString()
  @IsOptional()
  postContent: string;

  @IsArray()
  @IsNotEmpty()
  images: ImageInfo[];

  @IsDate()
  @IsNotEmpty()
  postDate: Date;

  @IsString()
  @IsNotEmpty()
  postLocation: string;
}
