import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userNickname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  profileImage: string;
}
