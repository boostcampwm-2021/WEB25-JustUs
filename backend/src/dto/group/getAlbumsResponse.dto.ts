import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class postList {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postTitle: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postLongitude: number;
}

class albumList {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  albumId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  albumName: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [postList] })
  posts: postList[];
}

export class GetAlbumsResponseDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [albumList] })
  albums: albumList[];
}
