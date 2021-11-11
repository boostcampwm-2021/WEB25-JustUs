import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostRequestDto {
  @IsString()
  @IsNotEmpty()
  postTitle: string;

  @IsString()
  @IsOptional()
  postContent: string;

  @IsArray()
  @IsNotEmpty()
  postImage: string[];

  @IsString()
  @IsNotEmpty()
  postDate: string;

  @IsString()
  @IsNotEmpty()
  postLocation: string;

  @IsNumber()
  @IsNotEmpty()
  postLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  postLongitude: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  albumId: number;
}
