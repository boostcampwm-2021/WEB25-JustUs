import { ApiProperty } from "@nestjs/swagger";

export class UpdateGroupInfoResponseDto {
  @ApiProperty()
  groupImage: string;
}
