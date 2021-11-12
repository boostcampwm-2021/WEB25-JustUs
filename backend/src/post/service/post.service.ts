import { Injectable, NotFoundException } from "@nestjs/common";
import { ImageService } from "src/image/service/image.service";
import { InjectRepository } from "@nestjs/typeorm";
import { PostRepository } from "../post.repository";
import { UserRepository } from "src/user/user.repository";
import { AlbumRepository } from "src/album/album.repository";
import { CreatePostRequestDto } from "src/dto/post/createPostRequest.dto";
import { GetPostInfoResponseDto } from "src/dto/post/getPostInfoResponse.dto";
import { UpdatePostInfoRequestDto } from "src/dto/post/updatePostInfoRequest.dto";
import { Image } from "src/image/image.entity";

@Injectable()
export class PostService {
  constructor(
    private readonly imageService: ImageService,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  async createPost(createPostRequestDto: CreatePostRequestDto): Promise<number> {
    const { postTitle, postContent, postImages, postDate, postLocation, postLatitude, postLongitude, userId, albumId } =
      createPostRequestDto;

    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const album = await this.albumRepository.findOne({ albumId });
    if (!album) throw new NotFoundException(`Not found album with the id ${albumId}`);

    // const images = postImages.map(e => {
    //   const image = new Image();
    //   image.imageUrl = e;
    //   return image;
    // });

    const post = await this.postRepository.save({
      postTitle: postTitle,
      postContent: postContent,
      postDate: postDate,
      postLocation: postLocation,
      postLatitude: postLatitude,
      postLongitude: postLongitude,
      user: user,
      album: album,
      //images: images,
    });

    this.imageService.saveImage(post, postImages);

    return post.postId;
  }

  async getPostInfo(postId: number): Promise<GetPostInfoResponseDto> {
    const post = await this.postRepository.readPostQuery(postId);
    const { user, postTitle, postContent, postDate, postLocation, images } = post;
    const userId = user.userId;
    const userNickname = user.userNickname;
    return { userId, userNickname, postTitle, postContent, postDate, postLocation, images };
  }

  async updatePostInfo(postId: number, updatePostInfoRequestDto: UpdatePostInfoRequestDto): Promise<string> {
    const {
      postTitle,
      postContent,
      deleteImagesId,
      addImages,
      postDate,
      postLocation,
      postLatitude,
      postLongitude,
      userId,
    } = updatePostInfoRequestDto;

    const post = await this.postRepository.findOne({ postId });
    const postUserId = post.user.userId;
    if (postUserId !== userId) throw new NotFoundException("It cannot be updated because it is not the author.");

    post.postTitle = postTitle;
    post.postContent = postContent;
    post.postDate = postDate;
    post.postLocation = postLocation;
    post.postLatitude = postLatitude;
    post.postLongitude = postLongitude;
    this.postRepository.save(post);

    this.imageService.saveImage(post, addImages);
    this.imageService.deleteImage(deleteImagesId);

    return "PostInfo update success!!";
  }

  async deletePost(postId: number): Promise<string> {
    const post = await this.postRepository.findOne(postId, { relations: ["images"] });
    if (!post) throw new NotFoundException(`Not found post with the id ${postId}`);

    this.postRepository.softRemove(post);

    return "Post delete success!!";
  }
}
