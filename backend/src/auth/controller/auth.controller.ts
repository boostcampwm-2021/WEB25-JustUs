import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { NaverOauthGuard } from "../guard/naver-auth.guard";

@Controller("/api/login")
export class AuthController {
  //constructor(private jwtAuthService: JwtAuthService) {}
  @Get()
  @UseGuards(NaverOauthGuard)
  async naverAuth() {
    console.log("Asd");
    return;
  }

  @Get("/oauth/callback")
  @UseGuards(NaverOauthGuard)
  async naverAuthRedirect(@Req() req: Request, @Res() res: Response) {
    //const { accessToken, refreshToken } = req.user;

    // res.cookie("accessToken", accessToken);
    // res.cookie("refreshToken", refreshToken);
    res.redirect("http://localhost:3000");
    res.end();
  }
}
