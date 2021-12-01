import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserInfoResponseDto {
  @ApiProperty()
  profileImage: string;
}
