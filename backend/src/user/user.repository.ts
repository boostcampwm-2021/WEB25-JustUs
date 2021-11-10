import { UserInfoDto } from "src/dto/user/userInfo.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(registerUserDto: UserInfoDto): Promise<User> {
    const user = this.create(registerUserDto);

    return await this.save(user);
  }
}
