import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GroupModule } from "./group/group.module";
import { AlbumModule } from "./album/album.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, AuthModule, GroupModule, AlbumModule],
})
export class AppModule {}
