import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupInfo {
  @IsOptional()
  @ApiPropertyOptional({ type: "file" })
  groupImage: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupName: string;
}
