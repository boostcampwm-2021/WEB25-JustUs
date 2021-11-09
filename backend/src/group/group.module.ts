import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupController } from "./controller/group.controller";
import { GroupRepository } from "./group.repository";
import { GroupService } from "./service/group.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
