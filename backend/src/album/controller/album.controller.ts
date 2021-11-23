import { Body, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AlbumService } from "../service/album.service";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/dto/album/updateAlbumInfoRequest.dto";
import { CreateAlbumResponseDto } from "src/dto/album/createAlbumResponse.dto";
import { CustomController } from "src/custom/decorator/controller.decorator";

@CustomController("albums", "앨범 API")
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
