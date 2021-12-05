import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AlbumRepository } from "src/domain/album/album.repository";
import { HashTagRepository } from "src/domain/hashtag/hashtag.repository";
import { UserRepository } from "src/domain/user/user.repository";
import { Connection } from "typeorm";
import { PostRepository } from "../post.repository";
import { PostService } from "../post.service";
import { Post } from "../post.entity";
import { User } from "src/domain/user/user.entity";
import { Image } from "src/domain/image/image.entity";
import { GetPostInfoResponseDto } from "src/domain/post/dto/getPostInfoResponse.dto";
import { AlbumService } from "src/domain/album/album.service";
import { ImageService } from "src/domain/image/image.service";
import { HashTagService } from "src/domain/hashtag/hashtag.service";
import { GroupRepository } from "src/domain/group/group.repository";
import { ImageRepository } from "src/domain/image/image.repository";
import { Album } from "src/domain/album/album.entity";
import { HashTag } from "src/domain/hashtag/hashtag.entity";
import { GetSearchPostResponse } from "src/domain/post/dto/getSearchPostResponse.dto";

const mockPostRepository = () => ({
  getPostQuery: jest.fn(),
  update: jest.fn(),
});

const mockUserRepository = () => ({});

const mockAlbumRepository = () => ({
  findOne: jest.fn(),
});

const mockHashTagRepository = () => ({
  getSearchPosts: jest.fn(),
});

const mockConnection = () => ({});

type MockPostRepository = Partial<Record<keyof PostRepository, jest.Mock>>;
type MockAlbumRepository = Partial<Record<keyof AlbumRepository, jest.Mock>>;
type MockHashTagRepository = Partial<Record<keyof HashTagRepository, jest.Mock>>;

describe("PostService", () => {
  let postService: PostService;
  let postRepository: MockPostRepository;
  let albumRepository: MockAlbumRepository;
  let hashTagRepository: MockHashTagRepository;

  let existsPost;
  let updatePost;
  let existsImage1;
  let existsImage2;
  let user;
  let existsAlbum1;
  let existsAlbum2;
  let existsHashTag;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        AlbumService,
        ImageService,
        HashTagService,
        GroupRepository,
        ImageRepository,
        { provide: getRepositoryToken(PostRepository), useValue: mockPostRepository() },
        { provide: getRepositoryToken(UserRepository), useValue: mockUserRepository() },
        { provide: getRepositoryToken(AlbumRepository), useValue: mockAlbumRepository() },
        { provide: getRepositoryToken(HashTagRepository), useValue: mockHashTagRepository() },
        { provide: Connection, useValue: mockConnection() },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get<MockPostRepository>(getRepositoryToken(PostRepository));
    albumRepository = module.get<MockAlbumRepository>(getRepositoryToken(AlbumRepository));
    hashTagRepository = module.get<MockHashTagRepository>(getRepositoryToken(HashTagRepository));

    initData();
  });

  describe("getPostInfo()", () => {
    it("게시글 정보 조회 성공", async () => {
      postRepository.getPostQuery.mockResolvedValue(existsPost);
      const post = makeResultPost();
      const result = await postService.getPostInfo(1);

      expect(result).toStrictEqual(post);
    });
  });

  describe("shiftPost()", () => {
    it("게시글 이동 성공", async () => {
      albumRepository.findOne.mockResolvedValue(existsAlbum2);
      postRepository.update.mockResolvedValue(updatePost);
      const result = await postService.shiftPost(1, { albumId: 2 });

      expect(result).toStrictEqual(updatePost);
    });
  });

  describe("getSearchPost()", () => {
    it("해시태그를 이용해 게시글 검색 성공", async () => {
      hashTagRepository.getSearchPosts.mockResolvedValue(existsHashTag);
      const posts = await postService.getSearchPost(1);

      expect(posts).toStrictEqual(new GetSearchPostResponse(existsHashTag.posts));
    });
  });

  const makeResultPost = () => {
    return new GetPostInfoResponseDto(existsPost);
  };

  const initData = () => {
    initPost();
    initImage();
    existsPost.images = [existsImage1, existsImage2];
    initUser();
    existsPost.user = user;
    initAlbum();
    updatePost.album = existsAlbum2;
    initHashTag();
  };

  const initPost = () => {
    existsPost = new Post();
    existsPost.postId = 1;
    existsPost.postTitle = "title";
    existsPost.postContent = "content";
    existsPost.postDate = "date";
    existsPost.postLatitude = 36;
    existsPost.postLongitude = 45;
    existsPost.postLocation = "location";

    updatePost = existsPost;
  };

  const initImage = () => {
    existsImage1 = new Image();
    existsImage1.imageUrl = "url1";
    existsImage1.imageId = 1;

    existsImage2 = new Image();
    existsImage2.imageUrl = "url2";
    existsImage2.imageId = 2;
  };

  const initUser = () => {
    user = new User();
    user.userId = 1;
    user.userNickname = "nickname";
  };

  const initAlbum = () => {
    existsAlbum1 = new Album();
    existsAlbum1.albumId = 1;
    existsAlbum1.albumName = "albumName1";
    existsAlbum1.base = true;

    existsAlbum2 = new Album();
    existsAlbum2.albumId = 2;
    existsAlbum2.albumName = "albumName2";
    existsAlbum2.base = false;
  };

  const initHashTag = () => {
    existsHashTag = new HashTag();
    existsHashTag.hashtagId = 1;
    const posts = [{ postId: existsPost.postId, postTitle: existsPost.postTitle, postDate: existsPost.postDate }];
    const dto = new GetSearchPostResponse(posts);
    existsHashTag.posts = dto;
  };
});
