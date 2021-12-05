import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Group } from "../group.entity";

export class CreateGroupResponseDto {
  @Exclude()
  @ApiProperty()
  private readonly groupId: number;

  @Exclude()
  @ApiProperty()
  private readonly groupImage: string;

  constructor(group: Group) {
    this.groupId = group.groupId;
    this.groupImage = group.groupImage;
  }

  static returnDto(group: Group) {
    return new CreateGroupResponseDto(group);
  }
}
