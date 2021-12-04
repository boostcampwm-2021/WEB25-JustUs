import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ImageService } from "src/domain/image/image.service";
import { getImagesUrl } from "src/util/imageUrl";
import { InjectRepository } from "@nestjs/typeorm";
import { PostRepository } from "./post.repository";
import { UserRepository } from "src/domain/user/user.repository";
import { AlbumRepository } from "src/domain/album/album.repository";
import { CreatePostRequestDto } from "src/domain/post/dto/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/domain/post/dto/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/domain/post/dto/updatePostInfoRequest.dto";
import { ShiftPostRequestDto } from "src/domain/post/dto/shiftPostRequest.dto";
import { GetSearchPostResponse } from "src/domain/post/dto/getSearchPostResponse.dto";
import { AlbumService } from "src/domain/album/album.service";
import { HashTagService } from "src/domain/hashtag/hashtag.service";
import { HashTag } from "src/domain/hashtag/hashtag.entity";
import { Post } from "src/domain/post/post.entity";
import { HashTagRepository } from "src/domain/hashtag/hashtag.repository";
import { Connection, UpdateResult } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    private readonly imageService: ImageService,
    private readonly albumService: AlbumService,
    private readonly hashTagService: HashTagService,
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AlbumRepository)
    private readonly albumRepository: AlbumRepository,
    @InjectRepository(HashTagRepository)
    private readonly hashTagRepository: HashTagRepository,
    private readonly connection: Connection,
  ) {}

  async createPost(
    userId: number,
    files: Express.Multer.File[],
    createPostRequestDto: CreatePostRequestDto,
  ): Promise<number> {
    const postImages = getImagesUrl(files);

    const { postTitle, postContent, postDate, postLocation, postLatitude, postLongitude, groupId } =
      createPostRequestDto;

    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const baseAlbumId = await this.albumService.getBaseAlbumId(groupId);

    const album = await this.albumRepository.findOne(baseAlbumId);
    if (!album) throw new NotFoundException(`Not found album with the id ${baseAlbumId}`);

    const images = this.imageService.saveImage(postImages);

    const hashtags = await this.getHashTag(postContent, groupId);

    const post = await this.postRepository.save(
      Post.toEntity(
        postTitle,
        postContent,
        postDate,
        postLocation,
        postLatitude,
        postLongitude,
        user,
        album,
        images,
        hashtags,
      ),
    );

    return post.postId;
  }

  async getHashTag(textParam: string, groupId: number): Promise<HashTag[]> {
    const tagsContent = this.removeTags(textParam);

    return await this.hashTagService.makeHashTag(groupId, tagsContent);
  }

  removeTags(textParam: string): string[] {
    const hashTagText = textParam.match(/#([\w|ㄱ-ㅎ|가-힣]+)/g);

    const removeTag = hashTagText?.map(e => {
      return e.substr(1);
    });

    return removeTag === undefined ? [] : removeTag;
  }

  async getPostInfo(postId: number): Promise<GetPostInfoResponseDto> {
    const post = await this.postRepository.getPostQuery(postId);
    if (!post) throw new NotFoundException(`Not found post with the id ${postId}`);

    return GetPostInfoResponseDto.returnDto(post);
  }

  async updatePostInfo(
    userId: number,
    postId: number,
    files: Express.Multer.File[],
    updatePostInfoRequestDto: UpdatePostInfoRequestDto,
  ): Promise<UpdateResult> {
    const addImages = getImagesUrl(files);

    const { postTitle, postContent, deleteImagesId, postDate, postLocation, postLatitude, postLongitude, groupId } =
      updatePostInfoRequestDto;

    const relations = ["user", "hashtags"];
    const post = await this.validateUserAuthor(userId, postId, relations);

    const hashtags = await this.getHashTag(postContent, groupId);

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      post.hashtags = hashtags;
      await queryRunner.manager.getRepository(Post).save(post);

      const result = await queryRunner.manager.getRepository(Post).update(postId, {
        postTitle,
        postContent,
        postDate,
        postLocation,
        postLatitude,
        postLongitude,
      });

      await this.imageService.updateImages(post, addImages, deleteImagesId, queryRunner);

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async deletePost(userId: number, postId: number): Promise<boolean> {
    const relations = ["user", "images"];
    const post = await this.validateUserAuthor(userId, postId, relations);

    const deleteTags = this.removeTags(post.postContent);

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.getRepository(Post).softRemove(post);

      await this.hashTagService.deleteHashTags(deleteTags, postId, queryRunner);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async validateUserAuthor(userId: number, postId: number, relations: Array<string>): Promise<Post> {
    const post = await this.postRepository.findOne(postId, { relations: relations });
    if (!post) throw new NotFoundException(`Not found post with the id ${postId}`);

    const postUserId = post.user.userId;
    if (postUserId !== userId) throw new UnauthorizedException("It cannot be updated because it is not the author.");

    return post;
  }

  async shiftPost(postId: number, shiftPostRequestDto: ShiftPostRequestDto): Promise<UpdateResult> {
    const { albumId } = shiftPostRequestDto;
    const album = await this.albumRepository.findOne(albumId);
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    return await this.postRepository.update(postId, { album });
  }

  async getSearchPost(hashtagId: number): Promise<GetSearchPostResponse> {
    const { posts } = await this.hashTagRepository.getSearchPosts(hashtagId);
    if (!posts) throw new NotFoundException(`Not found hashtag with the id ${hashtagId}`);

    return GetSearchPostResponse.returnDto(posts);
  }
}
