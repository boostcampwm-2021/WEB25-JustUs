import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { AlbumService } from "../service/album.service";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/dto/album/updateAlbumInfoRequest.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/albums")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(200)
  CreateAlbum(@Body() createAlbumRequestDto: CreateAlbumRequestDto): Promise<string> {
    return this.albumService.createAlbum(createAlbumRequestDto);
  }

  @Put("/:albumId")
  @HttpCode(200)
  UpdateAlbumInfo(
    @Param("albumId") albumId: number,
    @Body() updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto,
  ): Promise<string> {
    return this.albumService.updateAlbumInfo(albumId, updateAlbumInfoRequestDto);
  }

  @Delete("/:albumId")
  @HttpCode(200)
  DeleteAlbum(@Param("albumId") albumId: number): Promise<string> {
    return this.albumService.deleteAlbum(albumId);
  }
}
