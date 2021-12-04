import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

class groupList {
  @Exclude()
  @ApiProperty()
  private readonly groupId: number;

  @Exclude()
  @ApiProperty()
  private readonly groupName: string;

  @Exclude()
  @ApiProperty()
  private readonly groupImage: string;
}

export class GetGroupsResponseDto {
  @Exclude()
  @ApiProperty({ type: [groupList] })
  private readonly groups: groupList[];

  constructor(array: any[]) {
    this.groups = array;
  }

  static returnDto(array: any[]) {
    return new GetGroupsResponseDto(array);
  }
}
