import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { UserInfo } from "../user/userInfo.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetGroupInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupCode: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [UserInfo] })
  users: UserInfo[];
}
