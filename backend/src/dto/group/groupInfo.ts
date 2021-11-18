import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GroupInfo {
  @ApiProperty({ type: "file" })
  groupImage: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupName: string;
}
