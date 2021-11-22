import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";
import { NaverOauthGuard } from "../guard/naver-auth.guard";
import { JwtAuthGuard } from "../guard/jwt-auth-guard";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { UserService } from "src/user/service/user.service";

@ApiTags("auth API")
@ApiBearerAuth()
@Controller("/auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get("/login")
  @UseGuards(NaverOauthGuard)
  async naverAuth() {
    return;
  }

  @Get("/login/oauth/callback")
  @UseGuards(NaverOauthGuard)
  async naverAuthRedirect(@Req() { user }: CustomRequest, @Res() res: Response) {
    const { accessToken, refreshToken } = user;

    const accessTokenTokenExpireTime = 1000 * 60 * 60;
    const refreshTokenExpireTime = accessTokenTokenExpireTime * 24 * 7;

    res.cookie("accessToken", accessToken, { maxAge: accessTokenTokenExpireTime });
    res.cookie("refreshToken", refreshToken, { maxAge: refreshTokenExpireTime });

    const redirectUrl = process.env.NODE_ENV === "dev" ? process.env.DEV_REDIRECT_URL : process.env.PROD_REDIRECT_URL;

    res.redirect(redirectUrl);
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logOut(@Req() { user }: CustomRequest, @Res() res: Response): Promise<void> {
    const { userId } = user;

    await this.userService.updateToken(userId, null);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.end();
  }
}
