import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ImageService } from "src/image/service/image.service";
import { getImagesUrl } from "src/common/imageUrl";
import { InjectRepository } from "@nestjs/typeorm";
import { PostRepository } from "../post.repository";
import { UserRepository } from "src/user/user.repository";
import { AlbumRepository } from "src/album/album.repository";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/dto/post/updatePostInfoRequest.dto";
import { ShiftPostRequestDto } from "src/dto/post/shiftPostRequest.dto";
import { GetSearchPostResponse } from "src/dto/post/getSearchPostResponse.dto";
import { AlbumService } from "src/album/service/album.service";
import { HashTagService } from "src/hashtag/service/hashtag.service";
import { HashTag } from "src/hashtag/hashtag.entity";
import { Post } from "src/post/post.entity";
import { HashTagRepository } from "src/hashtag/hashtag.repository";
import { Connection } from "typeorm";

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

    const post = await this.postRepository.save({
      postTitle: postTitle,
      postContent: postContent,
      postDate: postDate,
      postLocation: postLocation,
      postLatitude: Number(postLatitude),
      postLongitude: Number(postLongitude),
      user: user,
      album: album,
      images: images,
      hashtags: hashtags,
    });

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

    const { user, postTitle, postContent, postDate, postLatitude, postLongitude, images, postLocation } = post;
    const userId = user.userId;
    const userNickname = user.userNickname;

    return {
      userId,
      userNickname,
      postId,
      postTitle,
      postContent,
      postDate,
      postLatitude,
      postLongitude,
      postLocation,
      images,
    };
  }

  async updatePostInfo(
    userId: number,
    postId: number,
    files: Express.Multer.File[],
    updatePostInfoRequestDto: UpdatePostInfoRequestDto,
  ): Promise<string> {
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

      await queryRunner.manager.getRepository(Post).update(postId, {
        postTitle,
        postContent,
        postDate,
        postLocation,
        postLatitude,
        postLongitude,
      });

      await this.imageService.updateImages(post, addImages, deleteImagesId, queryRunner);

      await queryRunner.commitTransaction();

      return "PostInfo update success!!";
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async deletePost(userId: number, postId: number): Promise<string> {
    const relations = ["user", "images"];
    const post = await this.validateUserAuthor(userId, postId, relations);

    const deleteTags = this.removeTags(post.postContent);

    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.getRepository(Post).softRemove(post);

      await this.hashTagService.deleteHashTags(deleteTags, postId, queryRunner);

      await queryRunner.commitTransaction();

      return "Post delete success!!";
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

  async shiftPost(postId: number, shiftPostRequestDto: ShiftPostRequestDto): Promise<string> {
    const { albumId } = shiftPostRequestDto;
    const album = await this.albumRepository.findOne(albumId);
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    await this.postRepository.update(postId, { album });

    return "Post Shift success!!";
  }

  async getSearchPost(hashtagId: number): Promise<GetSearchPostResponse> {
    const { posts } = await this.hashTagRepository.getSearchPosts(hashtagId);
    if (!posts) throw new NotFoundException(`Not found hashtag with the id ${hashtagId}`);

    return { posts };
  }
}
