import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(userEmail: string, userNickname: string, userImage: string): Promise<User> {
    const user = this.create({ userEmail, userNickname, userImage });

    return await this.save(user);
  }
}
