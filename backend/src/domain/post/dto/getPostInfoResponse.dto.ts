import { ImageInfo } from "../../image/dto/imageInfo";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Post } from "../post.entity";

export class GetPostInfoResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly postId: number;

  @Exclude()
  @ApiProperty()
  private readonly userId: number;

  @Exclude()
  @ApiProperty()
  private readonly userNickname: string;

  @Exclude()
  @ApiProperty()
  private readonly postTitle: string;

  @Exclude()
  @ApiProperty()
  private readonly postContent: string;

  @Exclude()
  @ApiProperty({ type: [ImageInfo] })
  private readonly images: ImageInfo[];

  @Exclude()
  @ApiProperty()
  private readonly postDate: Date;

  @Exclude()
  @ApiProperty()
  private readonly postLatitude: number;

  @Exclude()
  @ApiProperty()
  private readonly postLongitude: number;

  @Exclude()
  @ApiProperty()
  private readonly postLocation: string;

  constructor(post: Post) {
    this.postId = post.postId;
    this.userId = post.user.userId;
    this.userNickname = post.user.userNickname;
    this.postTitle = post.postTitle;
    this.postContent = post.postContent;
    this.images = post.images;
    this.postDate = post.postDate;
    this.postLatitude = post.postLatitude;
    this.postLongitude = post.postLongitude;
    this.postLocation = post.postLocation;
  }

  static returnDto(post: Post) {
    return new GetPostInfoResponseDto(post);
  }
}
