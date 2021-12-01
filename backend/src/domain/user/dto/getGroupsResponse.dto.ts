import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class groupList {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupName: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  groupImage: string;
}

export class GetGroupsResponseDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [groupList] })
  groups: groupList[];
}
