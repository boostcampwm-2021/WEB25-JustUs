import { IsNotEmpty, IsNumber } from "class-validator";
import { UserInfoResponseDto } from "./userInfoResponse.dto";

export class UpdateUserInfoRequestDto extends UserInfoResponseDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
