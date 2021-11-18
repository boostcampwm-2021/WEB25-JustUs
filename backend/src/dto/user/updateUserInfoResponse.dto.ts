import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  profileImage: string;
}
