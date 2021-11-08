import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { NaverStrategy } from "./strategy/naver.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy, JwtStrategy],
})
export class AuthModule {}
