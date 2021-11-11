import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { Group } from "./group.entity";

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  async readGroupQuery(groupId: number): Promise<Group> {
    return await this.createQueryBuilder("group")
      .leftJoin("group.users", "user")
      .select(["group.groupCode", "user.profileImage", "user.userNickname", "user.userEmail"])
      .where("group.groupId = :id", { id: groupId })
      .getOne();
  }

  async leaveGroupQuery(groupId: number, userId: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .from("users_groups_TB")
      .where("groups_tb_group_id = :groupId AND users_user_id = :userId", { groupId: groupId, userId: userId })
      .execute();
  }
}
