import { EntityRepository, Repository } from "typeorm";
import { Post } from "./post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async readPostQuery(postId: number): Promise<Post> {
    return await this.createQueryBuilder("post")
      .leftJoin("post.images", "image")
      .leftJoin("post.user", "user")
      .select([
        "post.postTitle",
        "post.postContent",
        "post.postDate",
        "post.postLocation",
        "image.imageUrl",
        "image.imageId",
        "user.userId",
        "user.userNickname",
      ])
      .where("post.postId = :id", { id: postId })
      .getOne();
  }
}
