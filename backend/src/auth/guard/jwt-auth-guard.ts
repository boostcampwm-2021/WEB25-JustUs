import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../user/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private jwtService: JwtService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { accessToken } = request.cookies;

    const { userId } = await this.validateToken(accessToken);
    if (!userId) throw new UnauthorizedException("토큰이 존재하지 않습니다.");

    return true;
  }

  async validateToken(token: string): Promise<User> {
    return await this.jwtService.verify(token);
  }
}
