import { Body, Delete, Param, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumRequestDto } from "src/domain/album/dto/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/domain/album/dto/updateAlbumInfoRequest.dto";
import { CreateAlbumResponseDto } from "src/domain/album/dto/createAlbumResponse.dto";
import { SwaggerCreateAlbum, SwaggerUpdateAlbumInfo, SwaggerDeleteAlbum } from "./swagger";
import { CustomController } from "src/custom/decorator/controller.decorator";

@CustomController("albums", "앨범 API")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @SwaggerCreateAlbum()
  CreateAlbum(@Body() createAlbumRequestDto: CreateAlbumRequestDto): Promise<CreateAlbumResponseDto> {
    return this.albumService.createAlbum(createAlbumRequestDto);
  }

  @Put("/:albumId")
  @SwaggerUpdateAlbumInfo()
  UpdateAlbumInfo(
    @Param("albumId") albumId: number,
    @Body() updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto,
  ): Promise<string> {
    return this.albumService.updateAlbumInfo(albumId, updateAlbumInfoRequestDto);
  }

  @Delete("/:albumId")
  @SwaggerDeleteAlbum()
  DeleteAlbum(@Param("albumId") albumId: number): Promise<string> {
    return this.albumService.deleteAlbum(albumId);
  }
}
