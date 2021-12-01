import { ApiProperty } from "@nestjs/swagger";

class postList {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postLatitude: number;

  @ApiProperty()
  postLongitude: number;
}

class albumList {
  @ApiProperty()
  albumId: number;

  @ApiProperty()
  albumName: string;

  @ApiProperty()
  base: boolean;

  @ApiProperty({ type: [postList] })
  posts: postList[];
}

export class GetAlbumsResponseDto {
  @ApiProperty({ type: [albumList] })
  albums: albumList[];
}
