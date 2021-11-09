import { Injectable } from "@nestjs/common";
import { UserInfoDto } from "src/dto/user/userInfo.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/service/user.service";
import { User } from "../../user/user.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(registerUserDto: UserInfoDto): Promise<User | undefined> {
    const user = await this.userService.registeredUser(registerUserDto);

    return user;
  }

  createToken(user: User): string {
    const payload = {
      userId: user.userId,
      userToken: "loginToken",
    };

    return this.jwtService.sign(payload, { expiresIn: "60m" });
  }
}
