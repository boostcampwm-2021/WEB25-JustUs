import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupRepository } from "src/domain/group/group.repository";
import { HashTagRepository } from "./hashtag.repository";
import { HashTagService } from "./service/hashtag.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([HashTagRepository, GroupRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [HashTagService],
  exports: [HashTagService],
})
export class HashtagModule {}
