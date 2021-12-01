import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { accessToken } = request.cookies;

    const validationAccessToken = await this.authService.validateToken(accessToken, "AccessToken");

    request.user = validationAccessToken;
    return true;
  }
}
