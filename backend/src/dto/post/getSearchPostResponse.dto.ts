import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class postList {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postDate: Date;
}

export class GetSearchPostResponse {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [postList] })
  posts: postList[];
}
