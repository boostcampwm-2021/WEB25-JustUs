import { ImageInfo } from "../../image/dto/imageInfo";
import { ApiProperty } from "@nestjs/swagger";

export class GetPostInfoResponseDto {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  userNickname: string;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postContent: string;

  @ApiProperty({ type: [ImageInfo] })
  images: ImageInfo[];

  @ApiProperty()
  postDate: Date;

  @ApiProperty()
  postLatitude: number;

  @ApiProperty()
  postLongitude: number;

  @ApiProperty()
  postLocation: string;

  constructor(
    postId: number,
    userId: number,
    userNickname: string,
    postTitle: string,
    postContent: string,
    images: ImageInfo[],
    postDate: Date,
    postLatitude: number,
    postLongitude: number,
    postLocation: string,
  ) {
    this.postId = postId;
    this.userId = userId;
    this.userNickname = userNickname;
    this.postTitle = postTitle;
    this.postContent = postContent;
    this.images = images;
    this.postDate = postDate;
    this.postLatitude = postLatitude;
    this.postLongitude = postLongitude;
    this.postLocation = postLocation;
  }
}
