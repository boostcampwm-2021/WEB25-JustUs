import { Injectable, NotFoundException } from "@nestjs/common";
import { ImageService } from "src/image/service/image.service";
import { InjectRepository } from "@nestjs/typeorm";
import { PostRepository } from "../post.repository";
import { UserRepository } from "src/user/user.repository";
import { AlbumRepository } from "src/album/album.repository";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/dto/post/updatePostInfoRequest.dto";
import { ShiftPostRequestDto } from "src/dto/post/shiftPostRequest.dto";
import { AlbumService } from "src/album/service/album.service";
import { HashTagService } from "src/hashtag/service/hashtag.service";

@Injectable()
export class PostService {
  constructor(
    private readonly imageService: ImageService,
    private readonly albumService: AlbumService,
    private readonly hashTagService: HashTagService,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  async createPost(
    userId: number,
    files: Express.Multer.File[],
    createPostRequestDto: CreatePostRequestDto,
  ): Promise<number> {
    const postImages = this.imageService.getImagesUrl(files);
    const { postTitle, postContent, postDate, postLocation, postLatitude, postLongitude, groupId } =
      createPostRequestDto;

    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const baseAlbumId = await this.albumService.getBaseAlbumId(groupId);

    const album = await this.albumRepository.findOne(baseAlbumId);
    if (!album) throw new NotFoundException(`Not found album with the id ${baseAlbumId}`);

    const images = this.imageService.saveImage(postImages);

    const tags = this.getHashTag(postContent);

    const paring = tags?.join(",");
    const hashtagCategory = tags === undefined ? "" : paring;
    const hashtags = tags === undefined ? [] : await this.hashTagService.makeHashTag(groupId, tags);

    const post = await this.postRepository.save({
      postTitle: postTitle,
      postContent: postContent,
      postDate: postDate,
      postLocation: postLocation,
      postLatitude: Number(postLatitude),
      postLongitude: Number(postLongitude),
      hashtagCategory: hashtagCategory,
      user: user,
      album: album,
      images: images,
      hashtags: hashtags,
    });

    return post.postId;
  }

  getHashTag(textParam: string): string[] {
    const hashTagText = textParam.match(/#([\w|ㄱ-ㅎ|가-힣]+)/g);

    const removeTag = hashTagText?.map(e => {
      return e.substr(1);
    });

    return removeTag;
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
    const addImages = this.imageService.getImagesUrl(files);

    const { postTitle, postContent, deleteImagesId, postDate, postLocation, postLatitude, postLongitude, groupId } =
      updatePostInfoRequestDto;

    const post = await this.postRepository.findOne(postId, { relations: ["user"] });
    if (!post) throw new NotFoundException(`Not found post with the id ${postId}`);

    const postUserId = post.user.userId;
    if (postUserId !== userId) throw new NotFoundException("It cannot be updated because it is not the author.");

    const newTags = this.getHashTag(postContent);

    await this.postRepository.deleteHashTagsQuery(postId);

    const hashtags = newTags === undefined ? [] : await this.hashTagService.makeHashTag(groupId, newTags);

    const paring = newTags?.join(",");
    const newHashtagCategory = newTags === undefined ? "" : paring;

    post.hashtags = hashtags;
    await this.postRepository.save(post);

    await this.postRepository.update(postId, {
      postTitle,
      postContent,
      postDate,
      postLocation,
      postLatitude,
      postLongitude,
      hashtagCategory: newHashtagCategory,
    });

    this.imageService.updateImages(post, addImages, deleteImagesId);

    return "PostInfo update success!!";
  }

  async deletePost(postId: number): Promise<string> {
    const post = await this.postRepository.findOne(postId, { relations: ["images"] });
    if (!post) throw new NotFoundException(`Not found post with the id ${postId}`);

    this.postRepository.softRemove(post);

    return "Post delete success!!";
  }

  async shiftPost(postId: number, shiftPostRequestDto: ShiftPostRequestDto): Promise<string> {
    const { albumId } = shiftPostRequestDto;
    const album = await this.albumRepository.findOne(albumId);
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    this.postRepository.update(postId, { album });

    return "Post Shift success!!";
  }
}
