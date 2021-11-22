import { IsString, IsNotEmpty, IsNumber } from "class-validator";
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
