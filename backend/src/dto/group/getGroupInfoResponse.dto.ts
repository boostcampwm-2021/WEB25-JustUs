import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { UserInfo } from "../user/userInfo.dto";

export class GetGroupInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  groupCode: string;

  @IsArray()
  @IsNotEmpty()
  users: UserInfo[];
}
