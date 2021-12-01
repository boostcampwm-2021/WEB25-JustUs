import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ImageInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;
}
