import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateGroupRequestDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  groupImage: string;

  @IsString()
  @IsNotEmpty()
  groupName: string;
}
