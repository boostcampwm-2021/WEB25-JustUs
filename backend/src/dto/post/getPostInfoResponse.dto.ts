import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ImageInfo } from "../image/imageInfo";

export class GetPostInfoResponseDto {
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
