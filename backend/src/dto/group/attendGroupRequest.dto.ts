import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AttendGroupRequestDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  code: string;
}
