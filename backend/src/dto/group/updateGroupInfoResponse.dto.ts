import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateGroupInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupImage: string;
}
