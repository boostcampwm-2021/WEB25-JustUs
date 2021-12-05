import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { UserInfoResponseDto } from "../../user/dto/userInfoResponse.dto";
import { Group } from "../group.entity";

export class GetGroupInfoResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly groupCode: string;

  @Exclude()
  @ApiProperty({ type: [UserInfoResponseDto] })
  private readonly users: UserInfoResponseDto[];

  constructor(group: Group) {
    this.groupCode = group.groupCode;
    this.users = group.users;
  }

  static returnDto(group: Group) {
    return new GetGroupInfoResponseDto(group);
  }
}
