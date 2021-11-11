import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";
import { UserModule } from "./user/user.module";

TypeOrmModule.forRootAsync({
  useFactory: async () =>
    Object.assign(await getConnectionOptions(), {
      autoLoadEntities: true,
    }),
});

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
})
export class AppModule {}
