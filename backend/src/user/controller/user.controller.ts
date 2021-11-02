import { Controller, Get } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../user.entity";

@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.userService.findAll();
  }
}
