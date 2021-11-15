import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetAlbumsResponseDto {
  @IsArray()
  @IsNotEmpty()
  albums: albumList[];
}

class albumList {
  @IsNumber()
  @IsNotEmpty()
  albumId: number;

  @IsString()
  @IsNotEmpty()
  albumName: string;

  @IsArray()
  @IsNotEmpty()
  posts: postList[];
}

class postList {
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  postTitle: string;

  @IsNumber()
  @IsNotEmpty()
  postLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  postLongitude: number;
}
