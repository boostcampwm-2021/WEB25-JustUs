import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserInfo } from "src/domain/user/dto/userInfo.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/domain/user/user.service";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(registerUserDto: UserInfo): Promise<User | undefined> {
    const user = await this.userService.registeredUser(registerUserDto);

    return user;
  }

  async validateToken(token: string, message: string): Promise<User> {
    try {
      const { userId } = await this.jwtService.verify(token);

      return await this.userService.findById(userId);
    } catch (e) {
      throw new UnauthorizedException(`Expired ${message}`);
    }
  }

  createToken(userId: number, userEmail: string, expire: string, token: string): string {
    const payload = {
      userId: userId,
      userEmail: userEmail,
      Token: token,
    };

    return this.jwtService.sign(payload, { expiresIn: expire });
  }
}
