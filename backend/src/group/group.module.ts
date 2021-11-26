import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "src/album/album.module";
import { ImageModule } from "src/image/image.module";
import { GroupController } from "./controller/group.controller";
import { GroupRepository } from "./group.repository";
import { GroupService } from "./service/group.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    AlbumModule,
    ImageModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
