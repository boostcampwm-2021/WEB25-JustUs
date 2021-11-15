import { Body, Req, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CustomRequest } from "src/myRequest/customRequest";
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
  CreatePost(@Req() { user }: CustomRequest, @Body() createPostRequestDto: CreatePostRequestDto): Promise<number> {
    const { userId } = user;
    return this.postService.createPost(userId, createPostRequestDto);
  }

  @Get("/:postId")
  GetPostInfo(@Param("postId") postId: number): Promise<GetPostInfoResponseDto> {
    return this.postService.getPostInfo(postId);
  }

  @Put("/:postId")
  UpdatePost(
    @Req() { user }: CustomRequest,
    @Param("postId") postId: number,
    @Body() updatePostInfoRequestDto: UpdatePostInfoRequestDto,
  ): Promise<string> {
    const { userId } = user;
    return this.postService.updatePostInfo(userId, postId, updatePostInfoRequestDto);
  }

  @Delete("/:postId")
  DeletePost(@Param("postId") postId: number): Promise<string> {
    return this.postService.deletePost(postId);
  }
}
