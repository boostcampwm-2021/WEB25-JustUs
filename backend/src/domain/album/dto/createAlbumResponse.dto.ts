import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Album } from "../album.entity";

export class CreateAlbumResponseDto {
  @Exclude() private readonly _albumId: number;

  constructor(album: Album) {
    this._albumId = album.albumId;
  }

  @ApiProperty()
  @Expose()
  get albumId(): number {
    return this._albumId;
  }

  static returnDto(album: Album) {
    return new CreateAlbumResponseDto(album);
  }
}
