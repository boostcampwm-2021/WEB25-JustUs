import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userNickname: string;

  @ApiProperty({ type: "file" })
  profileImage: any;
}
