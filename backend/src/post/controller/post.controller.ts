import { Body, Req, Delete, Get, Param, Post, Put, UseInterceptors, UploadedFiles, Query } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiResponse, ApiConsumes, ApiBody, ApiQuery } from "@nestjs/swagger";
import { CustomRequest } from "src/custom//myRequest/customRequest";
import { PostService } from "../service/post.service";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/dto/post/updatePostInfoRequest.dto";
import { ShiftPostRequestDto } from "src/dto/post/shiftPostRequest.dto";
import { GetSearchPostResponse } from "src/dto/post/getSearchPostResponse.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/image/service/image.service";
import { CustomController } from "src/custom/decorator/controller.decorator";

@CustomController("posts", "게시글 API")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreatePostRequestDto })
  @UseInterceptors(FilesInterceptor("postImages", 5, multerOption))
  @ApiResponse({ type: Number, description: "생성된 게시글 ID", status: 200 })
  CreatePost(
    @Req() { user }: CustomRequest,
    @Body() createPostRequestDto: CreatePostRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<number> {
    const { userId } = user;

    return this.postService.createPost(userId, files, createPostRequestDto);
  }

  @Get("/search")
  @ApiQuery({ name: "hashtagId", required: true })
  @ApiResponse({ type: GetSearchPostResponse, status: 200 })
  GetSearchPost(@Query("hashtagId") hashtagId: number): Promise<GetSearchPostResponse> {
    return this.postService.getSearchPost(hashtagId);
  }

  @Get("/:postId")
  @ApiParam({ name: "postId", type: Number })
  @ApiResponse({ type: GetPostInfoResponseDto, status: 200 })
  GetPostInfo(@Param("postId") postId: number): Promise<GetPostInfoResponseDto> {
    return this.postService.getPostInfo(postId);
  }

  @Put("/:postId")
  @UseInterceptors(FilesInterceptor("addImages", 5, multerOption))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdatePostInfoRequestDto })
  @ApiParam({ name: "postId", type: Number })
  @ApiOkResponse({ description: "게시글 수정 성공" })
  UpdatePost(
    @Req() { user }: CustomRequest,
    @Param("postId") postId: number,
    @Body() updatePostInfoRequestDto: UpdatePostInfoRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string> {
    const { userId } = user;

    return this.postService.updatePostInfo(userId, postId, files, updatePostInfoRequestDto);
  }

  @Delete("/:postId")
  @ApiParam({ name: "postId", type: Number })
  @ApiOkResponse({ description: "게시글 삭제 성공" })
  DeletePost(@Req() { user }: CustomRequest, @Param("postId") postId: number): Promise<string> {
    const { userId } = user;
    return this.postService.deletePost(userId, postId);
  }

  @Put("/:postId/shift")
  @ApiParam({ name: "postId", type: Number })
  @ApiOkResponse({ description: "게시글 이동 성공" })
  ShiftPost(@Param("postId") postId: number, @Body() shiftPostRequestDto: ShiftPostRequestDto): Promise<string> {
    return this.postService.shiftPost(postId, shiftPostRequestDto);
  }
}
