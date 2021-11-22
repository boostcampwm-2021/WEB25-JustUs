import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";
import { GroupInfo } from "./groupInfo";

export class UpdateGroupInfoRequestDto extends GroupInfo {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  clearImage: number;
}
