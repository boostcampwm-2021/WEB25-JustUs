import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GroupInfo {
  @IsString()
  @IsOptional()
  @ApiProperty()
  groupImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupName: string;
}
