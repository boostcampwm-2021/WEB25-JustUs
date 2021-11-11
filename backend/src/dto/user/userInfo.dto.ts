import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UserInfo {
  @IsString()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userNickname: string;

  @IsString()
  @IsOptional()
  profileImage: string;
}
