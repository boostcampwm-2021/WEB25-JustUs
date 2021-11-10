import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class GroupInfo {
  @IsString()
  @IsOptional()
  groupImage: string;

  @IsString()
  @IsNotEmpty()
  groupName: string;
}
