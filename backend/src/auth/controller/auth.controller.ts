import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { NaverOauthGuard } from "../guard/naver-auth.guard";
import { CustomRequest } from "src/myRequest/customRequest";

@Controller("/api/login")
export class AuthController {
  @Get()
  @UseGuards(NaverOauthGuard)
  async naverAuth() {
    return;
  }

  @Get("/oauth/callback")
  @UseGuards(NaverOauthGuard)
  async naverAuthRedirect(@Req() req: CustomRequest, @Res() res: Response) {
    const { accessToken, refreshToken } = req.user;

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.redirect("/");
    res.end();
  }
}
