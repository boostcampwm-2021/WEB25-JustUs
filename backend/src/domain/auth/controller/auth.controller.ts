import { Controller, Get, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";
import { NaverOauthGuard } from "../guard/naver-auth.guard";
import { JwtAuthGuard } from "../guard/jwt-auth-guard";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { UserService } from "src/domain/user/service/user.service";
import { AuthService } from "../service/auth.service";
import { NaverFilter } from "src/filter/naver.filter";
import { JwtRefreshTokenAuthGuard } from "../guard/jwt-refreshToken-auth-guard";

@ApiTags("auth API")
@ApiBearerAuth()
@Controller("/auth")
export class AuthController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get("/login")
  @UseGuards(NaverOauthGuard)
  async naverAuth() {
    return;
  }

  @Get("/login/oauth/callback")
  @UseFilters(NaverFilter)
  @UseGuards(NaverOauthGuard)
  async naverAuthRedirect(@Req() { user }: CustomRequest, @Res() res: Response) {
    const { accessToken, refreshToken } = user;

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

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

  @Get("refresh-token")
  @UseGuards(JwtRefreshTokenAuthGuard)
  async refreshToken() {
    return;
  }
}
