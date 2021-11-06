import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "src/dto/register-user.dto";
import { UserService } from "src/user/service/user.service";
import { User } from "../../user/user.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(registerUserDto: RegisterUserDto): Promise<User | undefined> {
    const user = await this.userService.registeredUser(registerUserDto);

    return user;
  }
}
