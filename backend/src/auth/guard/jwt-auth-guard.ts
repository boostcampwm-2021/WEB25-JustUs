import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { accessToken, refreshToken } = request.cookies;

    const validationAccessToken = await this.validateToken(accessToken);
    if (validationAccessToken) {
      request.user = validationAccessToken;
      return true;
    }

    const validationRefreshToken = await this.validateToken(refreshToken);
    if (!validationRefreshToken) throw new UnauthorizedException("Expired RefreshToken");

    const { userId } = validationRefreshToken;
    const accessTokenExpireTime = "1h";
    const newAccessToken = this.createToken(userId, accessTokenExpireTime);
    response.cookie("accessToken", newAccessToken);
    request.user = validationRefreshToken;

    return true;
  }

  async validateToken(token: string): Promise<{ userId: number }> {
    try {
      const { userId } = await this.jwtService.verify(token);
      return { userId: userId };
    } catch (e) {
      return undefined;
    }
  }

  createToken(userId: number, expire: string): string {
    const payload = {
      userId: userId,
      userToken: "loginToken",
    };

    return this.jwtService.sign(payload, { expiresIn: expire });
  }
}
