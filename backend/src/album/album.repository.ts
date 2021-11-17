import { EntityRepository, Repository } from "typeorm";
import { Album } from "./album.entity";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
  async getDeletePostIdQuery(albumId: number): Promise<Album> {
    return await this.createQueryBuilder("album")
      .leftJoin("album.posts", "post")
      .select(["album.albumId", "post.postId"])
      .where("album.albumId = :id", { id: albumId })
      .getOne();
  }
}
