import { ApiProperty } from "@nestjs/swagger";

class hashTagList {
  @ApiProperty()
  hashtagId: number;

  @ApiProperty()
  hashtagContent: string;
}

export class GetHashTagsResponseDto {
  @ApiProperty({ type: [hashTagList] })
  hashtags: hashTagList[];
}
