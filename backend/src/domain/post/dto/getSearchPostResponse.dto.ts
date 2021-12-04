import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

class postList {
  @Exclude()
  @ApiProperty()
  postId: number;

  @Exclude()
  @ApiProperty()
  postTitle: string;

  @Exclude()
  @ApiProperty()
  postDate: Date;
}

export class GetSearchPostResponse {
  @Exclude()
  @ApiProperty({ type: [postList] })
  private readonly posts: postList[];

  constructor(posts: postList[]) {
    this.posts = posts;
  }

  static returnDto(posts: postList[]) {
    return new GetSearchPostResponse(posts);
  }
}
