import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./controller/post.controller";
import { PostService } from "./service/post.service";
import { PostRepository } from "./post.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
