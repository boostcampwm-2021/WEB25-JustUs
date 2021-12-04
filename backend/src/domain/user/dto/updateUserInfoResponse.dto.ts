import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UpdateUserInfoResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly profileImage: string;

  constructor(profileImage: string) {
    this.profileImage = profileImage;
  }

  static returnDto(profileImage: string) {
    return new UpdateUserInfoResponseDto(profileImage);
  }
}
