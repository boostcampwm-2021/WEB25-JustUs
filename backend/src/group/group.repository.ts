import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { Group } from "./group.entity";

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  async getGroupQuery(groupId: number): Promise<Group> {
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

  async getAlbumsQuery(groupId: number): Promise<Group> {
    return await this.createQueryBuilder("group")
      .innerJoin("group.albums", "album")
      .leftJoin("album.posts", "post")
      .select([
        "group.groupId",
        "group.albumOrder",
        "album.albumId",
        "album.albumName",
        "album.base",
        "post.postId",
        "post.postTitle",
        "post.postLatitude",
        "post.postLongitude",
      ])
      .where("group.groupId = :id", { id: groupId })
      .getOne();
  }

  async getBaseAlbumQuery(groupId: number): Promise<Group> {
    const base = true;
    return await this.createQueryBuilder("group")
      .innerJoin("group.albums", "album")
      .select(["group.groupId", "album.albumId"])
      .where("group.groupId = :id AND album.base = :base", { id: groupId, base: base })
      .getOne();
  }

  async getHashTagsQuery(groupId: number): Promise<Group | undefined> {
    return await this.createQueryBuilder("group")
      .leftJoin("group.hashtags", "hashtag")
      .leftJoin("hashtag.posts", "post")
      .select(["group.groupId", "hashtag.hashtagId", "hashtag.hashtagContent"])
      .where("group.groupId=:id AND post.postId is not null", { id: groupId })
      .getOne();
  }
}
