import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver-v2";
import { RegisterUserDto } from "src/dto/user/register-user.dto";
import { AuthService } from "../service/auth.service";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(naverAccessToken: string, naverRefreshToken: string, profile: any): Promise<{ accessToken: string }> {
    const { email, nickname, profileImage } = profile;
    const registerUserDto: RegisterUserDto = new RegisterUserDto();
    registerUserDto.userEmail = email;
    registerUserDto.userNickname = nickname;
    registerUserDto.profileImage = profileImage;

    const user = await this.authService.validateUser(registerUserDto);

    if (!user) throw new UnauthorizedException("유저가 존재하지 않습니다.");

    const accessToken = this.authService.createToken(user);

    return { accessToken };
  }
}
