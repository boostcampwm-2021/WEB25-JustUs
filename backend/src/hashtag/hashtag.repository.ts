import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { HashTag } from "./hashtag.entity";

@EntityRepository(HashTag)
export class HashTagRepository extends Repository<HashTag> {
  async getSearchPosts(hashtagId: number): Promise<HashTag> {
    return await this.createQueryBuilder("hashtag")
      .leftJoin("hashtag.posts", "post")
      .select(["hashtag.hashtagId", "post.postId", "post.postTitle", "post.postDate"])
      .where("hashtag.hashtagId=:id", { id: hashtagId })
      .getOne();
  }

  async deleteHashTagsQuery(postId: number, hashtagId: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .from("posts_hashtags")
      .where("posts_post_id=:postId And hashtags_hashtag_id=:hashtagId", { postId: postId, hashtagId: hashtagId })
      .execute();
  }
}
