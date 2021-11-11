import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageService } from "./service/image.service";
import { ImageRepository } from "./image.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ImageRepository])],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
