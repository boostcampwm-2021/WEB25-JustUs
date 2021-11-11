import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { PostService } from "../service/post.service";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";

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
}
