import { IsNotEmpty, IsNumber } from "class-validator";
import { GroupInfo } from "./groupInfo";

export class UpdateGroupInfoRequestDto extends GroupInfo {
  @IsNumber()
  @IsNotEmpty()
  groupId: number;
}
