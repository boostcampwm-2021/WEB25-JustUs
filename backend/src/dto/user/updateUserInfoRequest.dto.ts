import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userNickname: string;

  @IsOptional()
  @ApiPropertyOptional({ type: "file" })
  profileImage: any;
}
