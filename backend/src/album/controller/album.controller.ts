import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiParam, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { AlbumService } from "../service/album.service";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/dto/album/updateAlbumInfoRequest.dto";
import { CreateAlbumResponseDto } from "src/dto/album/createAlbumResponse.dto";

@ApiTags("앨범 API")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("albums")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiResponse({ type: CreateAlbumResponseDto, status: 200 })
  CreateAlbum(@Body() createAlbumRequestDto: CreateAlbumRequestDto): Promise<CreateAlbumResponseDto> {
    return this.albumService.createAlbum(createAlbumRequestDto);
  }

  @Put("/:albumId")
  @ApiParam({ name: "albumId", type: Number })
  @ApiOkResponse({ description: "앨범 수정 성공" })
  UpdateAlbumInfo(
    @Param("albumId") albumId: number,
    @Body() updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto,
  ): Promise<string> {
    return this.albumService.updateAlbumInfo(albumId, updateAlbumInfoRequestDto);
  }

  @Delete("/:albumId")
  @ApiParam({ name: "albumId", type: Number })
  @ApiOkResponse({ description: "앨범 삭제 성공" })
  DeleteAlbum(@Param("albumId") albumId: number): Promise<string> {
    return this.albumService.deleteAlbum(albumId);
  }
}
