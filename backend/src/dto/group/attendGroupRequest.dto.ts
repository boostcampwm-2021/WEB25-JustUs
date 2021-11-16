import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AttendGroupRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
