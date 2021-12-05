import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

class postList {
  @Exclude()
  @ApiProperty()
  private readonly postId: number;

  @Exclude()
  @ApiProperty()
  private readonly postTitle: string;

  @Exclude()
  @ApiProperty()
  private readonly postLatitude: number;

  @Exclude()
  @ApiProperty()
  private readonly postLongitude: number;
}

class albumList {
  @Exclude()
  @ApiProperty()
  private readonly albumId: number;

  @Exclude()
  @ApiProperty()
  private readonly albumName: string;

  @Exclude()
  @ApiProperty()
  private readonly base: boolean;

  @Exclude()
  @ApiProperty({ type: [postList] })
  private readonly posts: postList[];
}

export class GetAlbumsResponseDto {
  @Exclude()
  @ApiProperty({ type: [albumList] })
  private readonly albums: albumList[];

  constructor(array: any[]) {
    this.albums = array;
  }

  static returnDto(array: any[]) {
    return new GetAlbumsResponseDto(array);
  }
}
