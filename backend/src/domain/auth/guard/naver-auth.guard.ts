import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class NaverOauthGuard extends AuthGuard("naver") {}
