import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/service/user.service";
import { User } from "../../user/user.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userEmail: string, userNickname: string, userImage: string): Promise<User | undefined> {
    const user = await this.userService.registeredUser(userEmail, userNickname, userImage);

    return user;
  }
}
