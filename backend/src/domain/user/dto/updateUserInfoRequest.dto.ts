import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class UpdateUserInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userNickname: string;

  @IsOptional()
  @ApiPropertyOptional({ type: "file" })
  profileImage: any;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  clearImage: number;
}
