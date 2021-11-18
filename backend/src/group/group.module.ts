import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "src/album/album.module";
import { AlbumRepository } from "src/album/album.repository";
import { ImageModule } from "src/image/image.module";
import { UserRepository } from "src/user/user.repository";
import { GroupController } from "./controller/group.controller";
import { GroupRepository } from "./group.repository";
import { GroupService } from "./service/group.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository, UserRepository, AlbumRepository]),
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
