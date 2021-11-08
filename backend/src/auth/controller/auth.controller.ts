import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { NaverOauthGuard } from "../guard/naver-auth.guard";

interface myRequest extends Request {
  user: { accessToken: string };
}

@Controller("/api/login")
export class AuthController {
  @Get()
  @UseGuards(NaverOauthGuard)
  async naverAuth() {
    return;
  }

  @Get("/oauth/callback")
  @UseGuards(NaverOauthGuard)
  async naverAuthRedirect(@Req() req: myRequest, @Res() res: Response) {
    const accessToken = req.user.accessToken;

    res.cookie("accessToken", accessToken);
    res.redirect("http://localhost:3000");
    res.end();
  }
}
