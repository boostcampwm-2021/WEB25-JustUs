import { ApiProperty } from "@nestjs/swagger";

export class UserInfoResponseDto {
  @ApiProperty()
  userNickname: string;

  @ApiProperty()
  profileImage: string;

  @ApiProperty()
  userId: number;

  constructor(userNickname: string, profileImage: string, userId: number) {
    this.userNickname = userNickname;
    this.profileImage = profileImage;
    this.userId = userId;
  }
}
