import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumRepository } from "./album.repository";
import { GroupRepository } from "src/domain/group/group.repository";
import { PostRepository } from "src/domain/post/post.repository";
import { AuthModule } from "src/domain/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([AlbumRepository, GroupRepository, PostRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
