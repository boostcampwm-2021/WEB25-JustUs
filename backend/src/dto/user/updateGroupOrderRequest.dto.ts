import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateGroupOrderRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupOrder: string;
}
