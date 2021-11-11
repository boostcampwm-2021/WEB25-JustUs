import { UserInfo } from "src/dto/user/userInfo.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(registerUserDto: UserInfo): Promise<User> {
    const user = this.create(registerUserDto);

    return await this.save(user);
  }
}
