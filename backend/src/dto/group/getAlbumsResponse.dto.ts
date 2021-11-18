import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  base: boolean;

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
