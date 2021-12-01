import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard("jwt") {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { refreshToken } = request.cookies;

    if (!refreshToken) throw new HttpException("No RefreshToken", 410);

    const validationRefreshToken = await this.authService.validateToken(refreshToken, "RefreshToken");
    if (validationRefreshToken.refreshToken !== refreshToken) {
      throw new UnauthorizedException("Unauthorized RefreshToken");
    }

    const { userId, userEmail } = validationRefreshToken;
    const accessTokenExpireTime = "30m";
    const newAccessToken = this.authService.createToken(userId, userEmail, accessTokenExpireTime, "accessToken");
    response.cookie("accessToken", newAccessToken, { httpOnly: true });
    request.user = validationRefreshToken;

    return true;
  }
}
