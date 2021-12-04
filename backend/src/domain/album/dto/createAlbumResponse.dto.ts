import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Album } from "../album.entity";

export class CreateAlbumResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly albumId: number;

  constructor(album: Album) {
    this.albumId = album.albumId;
  }

  static returnDto(album: Album) {
    return new CreateAlbumResponseDto(album);
  }
}
