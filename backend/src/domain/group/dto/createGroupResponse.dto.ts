import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupResponseDto {
  @ApiProperty()
  groupImage: string;

  @ApiProperty()
  groupId: number;
}
