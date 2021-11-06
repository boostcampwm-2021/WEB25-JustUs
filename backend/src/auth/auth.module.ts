import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { NaverStrategy } from "./strategy/naver.strategy";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy],
})
export class AuthModule {}
