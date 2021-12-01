import { ApiProperty } from "@nestjs/swagger";
import { UserInfoResponseDto } from "../../user/dto/userInfoResponse.dto";

export class GetGroupInfoResponseDto {
  @ApiProperty()
  groupCode: string;

  @ApiProperty({ type: [UserInfoResponseDto] })
  users: UserInfoResponseDto[];
}
