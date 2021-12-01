import { ApiProperty } from "@nestjs/swagger";

class groupList {
  @ApiProperty()
  groupId: number;

  @ApiProperty()
  groupName: string;

  @ApiProperty()
  groupImage: string;
}

export class GetGroupsResponseDto {
  @ApiProperty({ type: [groupList] })
  groups: groupList[];
}
