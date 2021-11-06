import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver-v2";
import { RegisterUserDto } from "src/dto/register-user.dto";
import { AuthService } from "../service/auth.service";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const { email, nickname, profileImage } = profile;
    const registerUserDto: RegisterUserDto = new RegisterUserDto();
    registerUserDto.userEmail = email;
    registerUserDto.userNickname = nickname;
    registerUserDto.profileImage = profileImage;

    const user = await this.authService.validateUser(registerUserDto);

    return user;
  }
}
