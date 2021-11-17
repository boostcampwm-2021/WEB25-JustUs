import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { GroupModule } from "src/group/group.module";
import { ImageModule } from "src/image/image.module";

@Module({
  imports: [
    GroupModule,
    ImageModule,
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
