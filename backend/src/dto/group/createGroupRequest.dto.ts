import { IsNotEmpty, IsNumber } from "class-validator";
import { GroupInfo } from "./groupInfo";

export class CreateGroupRequestDto extends GroupInfo {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
