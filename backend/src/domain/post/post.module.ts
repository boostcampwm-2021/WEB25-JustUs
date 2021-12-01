import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./controller/post.controller";
import { PostService } from "./service/post.service";
import { PostRepository } from "./post.repository";
import { UserRepository } from "src/domain/user/user.repository";
import { AlbumRepository } from "src/domain/album/album.repository";
import { ImageModule } from "src/domain/image/image.module";
import { AlbumModule } from "src/domain/album/album.module";
import { HashtagModule } from "src/domain/hashtag/hashtag.module";
import { HashTagRepository } from "src/domain/hashtag/hashtag.repository";
import { AuthModule } from "src/domain/auth/auth.module";

@Module({
  imports: [
    ImageModule,
    AlbumModule,
    HashtagModule,
    AuthModule,
    TypeOrmModule.forFeature([PostRepository, UserRepository, AlbumRepository, HashTagRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
