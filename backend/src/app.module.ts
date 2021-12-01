import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs";
import { UserModule } from "./domain/user/user.module";
import { AuthModule } from "./domain/auth/auth.module";
import { GroupModule } from "./domain/group/group.module";
import { AlbumModule } from "./domain/album/album.module";
import { PostModule } from "./domain/post/post.module";
import { HashtagModule } from "./domain/hashtag/hashtag.module";
import { LoggerMiddleware } from "./middlerware/logger.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    AuthModule,
    GroupModule,
    AlbumModule,
    PostModule,
    HashtagModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
