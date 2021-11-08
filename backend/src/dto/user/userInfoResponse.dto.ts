import { IsString, IsNotEmpty } from "class-validator";

export class FindUserResponseDto {
  @IsString()
  @IsNotEmpty()
  userNickname: string;

  @IsString()
  @IsNotEmpty()
  profileImage: string;
}
