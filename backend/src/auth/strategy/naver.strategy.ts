import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver-v2";
import { UserInfo } from "src/dto/user/userInfo.dto";
import { UserService } from "src/user/service/user.service";
import { AuthService } from "../service/auth.service";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    naverAccessToken: string,
    naverRefreshToken: string,
    profile: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, nickname, profileImage } = profile;
    const registerUserDto: UserInfo = new UserInfo();
    registerUserDto.userEmail = email;
    registerUserDto.userNickname = nickname;
    registerUserDto.profileImage = profileImage;

    const user = await this.authService.validateUser(registerUserDto);
    if (!user) throw new UnauthorizedException("유저가 존재하지 않습니다.");

    const { userId } = user;

    const oneHour = "1h";
    const oneWeek = "7d";
    const accessToken = this.authService.createToken(userId, oneHour);
    const refreshToken = this.authService.createToken(userId, oneWeek);

    await this.userService.updateToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}
