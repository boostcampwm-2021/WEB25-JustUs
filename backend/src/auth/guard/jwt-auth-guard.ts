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
    if (!validationRefreshToken) throw new UnauthorizedException("토큰이 존재하지 않습니다.");

    request.user = validationRefreshToken;

    const { userId } = validationRefreshToken;
    const updateAccessToken = this.createToken(userId, "1h");
    response.cookie("accessToken", updateAccessToken);

    return true;
  }

  async validateToken(token: string): Promise<{ userId: number }> {
    const { userId } = await this.jwtService.verify(token);

    return { userId: userId };
  }

  createToken(userId: number, expire: string): string {
    const payload = {
      userId: userId,
      userToken: "loginToken",
    };

    return this.jwtService.sign(payload, { expiresIn: expire });
  }
}
