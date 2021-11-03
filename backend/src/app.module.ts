import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { typeORMConfig } from "./configs/typeorm.config";

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule],
})
export class AppModule {}
