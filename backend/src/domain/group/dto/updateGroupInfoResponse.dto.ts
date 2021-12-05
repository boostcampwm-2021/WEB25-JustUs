import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UpdateGroupInfoResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly groupImage: string;

  constructor(groupImage: string) {
    this.groupImage = groupImage;
  }

  static returnDto(groupImage: string) {
    return new UpdateGroupInfoResponseDto(groupImage);
  }
}
