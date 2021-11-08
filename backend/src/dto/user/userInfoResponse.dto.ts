import { IsString, IsNotEmpty } from "class-validator";

export class UserInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  userNickname: string;

  @IsString()
  @IsNotEmpty()
  profileImage: string;
}
