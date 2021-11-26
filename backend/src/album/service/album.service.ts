import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumRepository } from "../album.repository";
import { GroupRepository } from "src/group/group.repository";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/dto/album/updateAlbumInfoRequest.dto";
import { CreateAlbumResponseDto } from "src/dto/album/createAlbumResponse.dto";
import { Album } from "../album.entity";
import { PostRepository } from "src/post/post.repository";
import { Connection, QueryRunner } from "typeorm";
import { Group } from "src/group/group.entity";
import { Post } from "src/post/post.entity";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private readonly connection: Connection,
  ) {}

  async createAlbum(createAlbumRequestDto: CreateAlbumRequestDto): Promise<CreateAlbumResponseDto> {
    const { groupId, albumName } = createAlbumRequestDto;
    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      const album = await queryRunner.manager.getRepository(Album).save({
        albumName: albumName,
        base: false,
        group: group,
      });
      const { albumId } = album;

      const { albumOrder } = group;
      const newAlbumOrder = `${albumId},${albumOrder}`;
      await queryRunner.manager.getRepository(Group).update(groupId, { albumOrder: newAlbumOrder });

      await queryRunner.commitTransaction();

      return { albumId };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateAlbumInfo(albumId: number, updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto): Promise<string> {
    const { albumName } = updateAlbumInfoRequestDto;
    const album = await this.albumRepository.findOne({ albumId });
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    await this.albumRepository.update(albumId, { albumName });

    return "AlbumInfo update success!!";
  }

  async deleteAlbum(albumId: number): Promise<string> {
    const album = await this.albumRepository.findOne(albumId, { relations: ["group"] });
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    const { base, group } = album;
    if (base) throw new NotFoundException("It cannot be deleted because it is baseAlbum.");
    const { groupId } = group;
    const baseAlbum = await this.getBaseAlbumId(groupId);

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await this.movePosts(albumId, baseAlbum, queryRunner);

      await queryRunner.manager.getRepository(Album).softRemove(album);

      const { albumOrder } = group;
      const reArrangedOrder = this.reArrangeAlbums(albumOrder, albumId);

      await queryRunner.manager.getRepository(Group).update(groupId, { albumOrder: reArrangedOrder });

      await queryRunner.commitTransaction();

      return "Album delete success!!";
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  reArrangeAlbums(albumOrder: string, albumId: number): string {
    const order = albumOrder.split(",");

    return order.filter(e => +e !== albumId).join(",");
  }

  async getBaseAlbumId(groupId: number): Promise<Album> {
    const { albums } = await this.groupRepository.getBaseAlbumQuery(groupId);
    if (!albums) throw new NotFoundException(`Not found group with the id ${groupId}`);
    const baseAlbumId = albums[0];

    return baseAlbumId;
  }

  async movePosts(albumId: number, baseAlbum: Album, queryRunner: QueryRunner): Promise<void> {
    const { posts } = await this.getMovePosts(albumId, queryRunner);

    posts.forEach(async post => {
      const postId = post.postId;
      await queryRunner.manager.getRepository(Post).update(postId, { album: baseAlbum });
    });
  }

  async getMovePosts(albumId: number, queryRunner: QueryRunner): Promise<Album> {
    const album = await queryRunner.manager.getCustomRepository(AlbumRepository).getDeletePostIdQuery(albumId);
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    return album;
  }

  ArrayToObject(albums: Album[]): object {
    const result = albums.reduce((target, key) => {
      target[key.albumId] = key;
      return target;
    }, {});

    return result;
  }
}
