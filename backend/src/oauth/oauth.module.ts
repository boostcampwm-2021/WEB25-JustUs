import { Module } from "@nestjs/common";
import { OauthController } from "./controller/oauth.controller";
import { OauthService } from "./service/oauth.service";

@Module({
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
