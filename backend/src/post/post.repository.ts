import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { Post } from "./post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPostQuery(postId: number): Promise<Post> {
    return await this.createQueryBuilder("post")
      .innerJoin("post.images", "image")
      .innerJoin("post.user", "user")
      .select([
        "post.postTitle",
        "post.postContent",
        "post.postDate",
        "post.postLatitude",
        "post.postLongitude",
        "image.imageUrl",
        "image.imageId",
        "user.userId",
        "user.userNickname",
      ])
      .where("post.postId = :id", { id: postId })
      .getOne();
  }

  async deleteHashTagsQuery(postId: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .from("posts_hashtags")
      .where("posts_post_id=:postId", { postId: postId })
      .execute();
  }
}
