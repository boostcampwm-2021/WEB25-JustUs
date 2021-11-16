import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userNickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  profileImage: string;
}
