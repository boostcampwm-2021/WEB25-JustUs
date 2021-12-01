import { ApiProperty } from "@nestjs/swagger";

class postList {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postDate: Date;
}

export class GetSearchPostResponse {
  @ApiProperty({ type: [postList] })
  posts: postList[];

  constructor(posts: postList[]) {
    this.posts = posts;
  }
}
