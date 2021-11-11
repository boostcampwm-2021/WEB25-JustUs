import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumController } from "./controller/album.controller";
import { AlbumService } from "./service/album.service";
import { AlbumRepository } from "./album.repository";
import { GroupRepository } from "src/group/group.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumRepository, GroupRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
