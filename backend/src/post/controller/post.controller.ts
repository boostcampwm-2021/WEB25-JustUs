import {
  Body,
  Req,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiParam, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CustomRequest } from "src/myRequest/customRequest";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { PostService } from "../service/post.service";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/dto/post/updatePostInfoRequest.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/image/service/image.service";

@ApiTags("게시글 API")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(200)
  //@UseInterceptors(FilesInterceptor("upload", 5, multerOption))
  @ApiResponse({ type: Number, description: "생성된 게시글 ID", status: 200 })
  CreatePost(
    @Req() { user }: CustomRequest,
    @Body() createPostRequestDto: CreatePostRequestDto,
    //@UploadedFiles() files: Express.Multer.File[],
  ): Promise<number> {
    const { userId } = user;
    //console.log(files);
    return this.postService.createPost(userId, createPostRequestDto);
  }

  @Get("/:postId")
  @ApiParam({ name: "postId", type: Number })
  @ApiResponse({ type: GetPostInfoResponseDto, status: 200 })
  GetPostInfo(@Param("postId") postId: number): Promise<GetPostInfoResponseDto> {
    return this.postService.getPostInfo(postId);
  }

  @Put("/:postId")
  @ApiParam({ name: "postId", type: Number })
  @ApiOkResponse({ description: "게시글 수정 성공" })
  UpdatePost(
    @Req() { user }: CustomRequest,
    @Param("postId") postId: number,
    @Body() updatePostInfoRequestDto: UpdatePostInfoRequestDto,
  ): Promise<string> {
    const { userId } = user;
    return this.postService.updatePostInfo(userId, postId, updatePostInfoRequestDto);
  }

  @Delete("/:postId")
  @ApiParam({ name: "postId", type: Number })
  @ApiOkResponse({ description: "게시글 삭제 성공" })
  DeletePost(@Param("postId") postId: number): Promise<string> {
    return this.postService.deletePost(postId);
  }
}
