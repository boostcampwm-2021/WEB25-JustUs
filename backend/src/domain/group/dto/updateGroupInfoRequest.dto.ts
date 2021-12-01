import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";
import { GroupInfo } from "./groupInfo";
import { Transform } from "class-transformer";

export class UpdateGroupInfoRequestDto extends GroupInfo {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  clearImage: number;
}
