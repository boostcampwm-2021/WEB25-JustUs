import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PostInfo {
  @IsString()
  @IsNotEmpty()
  postTitle: string;

  @IsString()
  @IsOptional()
  postContent: string;

  @IsString()
  @IsNotEmpty()
  postDate: Date;

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
}
