import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UserInfoDto {
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
