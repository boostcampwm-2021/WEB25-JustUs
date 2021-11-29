import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../service/auth.service";

@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard("jwt") {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { refreshToken } = request.cookies;

    const validationRefreshToken = await this.authService.validateToken(refreshToken, "RefreshToken");
    if (validationRefreshToken.refreshToken !== refreshToken) {
      throw new UnauthorizedException("Unauthorized RefreshToken");
    }

    const { userId, userEmail } = validationRefreshToken;
    const accessTokenExpireTime = "30m";
    const newAccessToken = this.authService.createToken(userId, userEmail, accessTokenExpireTime);
    response.cookie("accessToken", newAccessToken);
    request.user = validationRefreshToken;

    return true;
  }
}
