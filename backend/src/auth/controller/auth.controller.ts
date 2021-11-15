import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { NaverOauthGuard } from "../guard/naver-auth.guard";
import { JwtAuthGuard } from "../guard/jwt-auth-guard";
import { CustomRequest } from "src/myRequest/customRequest";
import { UserService } from "src/user/service/user.service";

@Controller("/api/auth")
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

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.redirect("/");
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
