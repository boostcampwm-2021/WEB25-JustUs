import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserInfoResponseDto } from "../user/userInfoResponse.dto";

export class GetGroupInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupCode: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [UserInfoResponseDto] })
  users: UserInfoResponseDto[];
}
