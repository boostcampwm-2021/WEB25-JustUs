import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [],
      synchronize: true, // false로 해두는 게 안전하다.
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
