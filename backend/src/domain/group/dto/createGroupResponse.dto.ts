import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupImage: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;
}
