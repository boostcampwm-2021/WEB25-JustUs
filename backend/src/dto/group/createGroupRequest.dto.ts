import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupRequestDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @Optional()
  groupImage: string;

  @IsString()
  @IsNotEmpty()
  groupName: string;
}
