import { Body, Delete, Param, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumRequestDto } from "src/domain/album/dto/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/domain/album/dto/updateAlbumInfoRequest.dto";
import { CreateAlbumResponseDto } from "src/domain/album/dto/createAlbumResponse.dto";
import { SwaggerCreateAlbum, SwaggerUpdateAlbumInfo, SwaggerDeleteAlbum } from "./swagger";
import { CustomController } from "src/custom/decorator/controller.decorator";
import { UpdateResult } from "typeorm";

@CustomController("albums", "앨범 API")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @SwaggerCreateAlbum()
  async CreateAlbum(@Body() createAlbumRequestDto: CreateAlbumRequestDto): Promise<CreateAlbumResponseDto> {
    return await this.albumService.createAlbum(createAlbumRequestDto);
  }

  @Put("/:albumId")
  @SwaggerUpdateAlbumInfo()
  async UpdateAlbumInfo(
    @Param("albumId") albumId: number,
    @Body() updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto,
  ): Promise<UpdateResult> {
    return await this.albumService.updateAlbumInfo(albumId, updateAlbumInfoRequestDto);
  }

  @Delete("/:albumId")
  @SwaggerDeleteAlbum()
  async DeleteAlbum(@Param("albumId") albumId: number): Promise<boolean> {
    return await this.albumService.deleteAlbum(albumId);
  }
}
