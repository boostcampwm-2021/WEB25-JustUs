import { EntityRepository, Repository } from "typeorm";
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
}
