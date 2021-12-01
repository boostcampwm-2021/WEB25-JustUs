import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ShiftPostRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  albumId: number;
}
