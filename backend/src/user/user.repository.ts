import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getGroupsQuery(userId: number): Promise<User> {
    return await this.createQueryBuilder("user")
      .leftJoin("user.groups", "group")
      .select(["user.userId", "user.groupOrder", "group.groupId", "group.groupName", "group.groupImage"])
      .where("user.userId=:id", { id: userId })
      .getOne();
  }
}
