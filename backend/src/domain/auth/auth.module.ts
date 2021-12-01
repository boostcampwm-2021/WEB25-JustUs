import { Module, forwardRef } from "@nestjs/common";
import { UserModule } from "src/domain/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { NaverStrategy } from "./strategy/naver.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
