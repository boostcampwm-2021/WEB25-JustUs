import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User } from "../user.entity";

export class UserInfoResponseDto {
  @Exclude()
  @ApiProperty()
  userNickname: string;

  @Exclude()
  @ApiProperty()
  profileImage: string;

  @Exclude()
  @ApiProperty()
  userId: number;

  constructor(user: User) {
    this.userNickname = user.userNickname;
    this.profileImage = user.profileImage;
    this.userId = user.userId;
  }

  static returnDto(user: User) {
    return new UserInfoResponseDto(user);
  }
}
