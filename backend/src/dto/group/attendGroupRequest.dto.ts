import { IsNotEmpty, IsString } from "class-validator";

export class AttendGroupRequestDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
