import { Body, Req, Delete, Get, Param, Post, Put, UseInterceptors, UploadedFiles, Query } from "@nestjs/common";
import { CustomRequest } from "src/custom//myRequest/customRequest";
import { PostService } from "./post.service";
import { CreatePostRequestDto } from "src/domain/post/dto/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/domain/post/dto/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/domain/post/dto/updatePostInfoRequest.dto";
import { ShiftPostRequestDto } from "src/domain/post/dto/shiftPostRequest.dto";
import { GetSearchPostResponse } from "src/domain/post/dto/getSearchPostResponse.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/configs";
import {
  SwaggerCreatePost,
  SwaggerGetSearchPost,
  SwaggerGetPostInfo,
  SwaggerUpdatePost,
  SwaggerDeletePost,
  SwaggerShiftPost,
} from "./swagger";
import { CustomController } from "src/custom/decorator/controller.decorator";
import { UpdateResult } from "typeorm";

@CustomController("posts", "게시글 API")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("postImages", 5, multerOption))
  @SwaggerCreatePost()
  async CreatePost(
    @Req() { user }: CustomRequest,
    @Body() createPostRequestDto: CreatePostRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<number> {
    const { userId } = user;

    return await this.postService.createPost(userId, files, createPostRequestDto);
  }

  @Get("/search")
  @SwaggerGetSearchPost()
  async GetSearchPost(@Query("hashtagId") hashtagId: number): Promise<GetSearchPostResponse> {
    return await this.postService.getSearchPost(hashtagId);
  }

  @Get("/:postId")
  @SwaggerGetPostInfo()
  async GetPostInfo(@Param("postId") postId: number): Promise<GetPostInfoResponseDto> {
    return await this.postService.getPostInfo(postId);
  }

  @Put("/:postId")
  @UseInterceptors(FilesInterceptor("addImages", 5, multerOption))
  @SwaggerUpdatePost()
  async UpdatePost(
    @Req() { user }: CustomRequest,
    @Param("postId") postId: number,
    @Body() updatePostInfoRequestDto: UpdatePostInfoRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UpdateResult> {
    const { userId } = user;

    return await this.postService.updatePostInfo(userId, postId, files, updatePostInfoRequestDto);
  }

  @Delete("/:postId")
  @SwaggerDeletePost()
  async DeletePost(@Req() { user }: CustomRequest, @Param("postId") postId: number): Promise<boolean> {
    const { userId } = user;
    return await this.postService.deletePost(userId, postId);
  }

  @Put("/:postId/shift")
  @SwaggerShiftPost()
  async ShiftPost(
    @Param("postId") postId: number,
    @Body() shiftPostRequestDto: ShiftPostRequestDto,
  ): Promise<UpdateResult> {
    return await this.postService.shiftPost(postId, shiftPostRequestDto);
  }
}
