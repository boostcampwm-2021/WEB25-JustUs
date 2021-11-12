import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { PostService } from "../service/post.service";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/dto/post/updatePostInfoRequest.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(200)
  CreatePost(@Body() createPostRequestDto: CreatePostRequestDto): Promise<number> {
    return this.postService.createPost(createPostRequestDto);
  }

  @Get("/:postId")
  GetPostInfo(@Param("postId") postId: number): Promise<GetPostInfoResponseDto> {
    return this.postService.getPostInfo(postId);
  }

  @Put("/:postId")
  UpdatePost(
    @Param("postId") postId: number,
    @Body() updatePostInfoRequestDto: UpdatePostInfoRequestDto,
  ): Promise<string> {
    return this.postService.updatePostInfo(postId, updatePostInfoRequestDto);
  }

  @Delete("/:postId")
  DeletePost(@Param("postId") postId: number): Promise<string> {
    return this.postService.deletePost(postId);
  }
}
