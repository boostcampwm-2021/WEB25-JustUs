import { Body, Controller, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { AlbumService } from "../service/album.service";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/albums")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(200)
  CreateAlbum(@Body() createAlbumRequestDto: CreateAlbumRequestDto): Promise<number> {
    return this.albumService.createAlbum(createAlbumRequestDto);
  }
}
