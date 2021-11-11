import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { PostService } from "../service/post.service";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";

@UseGuards(JwtAuthGuard)
@Controller("api/posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(200)
  CreatePost(@Body() createPostRequestDto: CreatePostRequestDto): Promise<number> {
    return this.postService.createPost(createPostRequestDto);
  }
}
