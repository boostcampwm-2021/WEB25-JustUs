import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Album } from "../album.entity";

export class CreateAlbumResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly _albumId: number;

  constructor(album: Album) {
    this._albumId = album.albumId;
  }

  static returnDto(album: Album) {
    return new CreateAlbumResponseDto(album);
  }
}
