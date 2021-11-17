import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiParam, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { AlbumService } from "../service/album.service";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/dto/album/updateAlbumInfoRequest.dto";
import { DeleteAlbumRequestDto } from "src/dto/album/deleteAlbumRequest.dto";

@ApiTags("앨범 API")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/albums")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({ type: String, description: "앨범 이름" })
  CreateAlbum(@Body() createAlbumRequestDto: CreateAlbumRequestDto): Promise<string> {
    return this.albumService.createAlbum(createAlbumRequestDto);
  }

  @Put("/:albumId")
  @HttpCode(200)
  @ApiParam({ name: "albumId", type: Number })
  @ApiOkResponse({ description: "앨범 수정 성공" })
  UpdateAlbumInfo(
    @Param("albumId") albumId: number,
    @Body() updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto,
  ): Promise<string> {
    return this.albumService.updateAlbumInfo(albumId, updateAlbumInfoRequestDto);
  }

  @Delete("/:albumId")
  @HttpCode(200)
  @ApiOkResponse({ description: "앨범 삭제 성공" })
  DeleteAlbum(
    @Param("albumId") albumId: number,
    @Body() deleteAlbumRequestDto: DeleteAlbumRequestDto,
  ): Promise<string> {
    return this.albumService.deleteAlbum(albumId, deleteAlbumRequestDto);
  }
}
