import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { GroupRepository } from "../group.repository";
import { GroupService } from "../group.service";
import { Group } from "../group.entity";
import { AttendGroupRequestDto } from "src/domain/group/dto/attendGroupRequest.dto";
import { UserRepository } from "src/domain/user/user.repository";
import { User } from "src/domain/user/user.entity";
import { Album } from "src/domain/album/album.entity";
import { Post } from "src/domain/post/post.entity";
import { HashTag } from "src/domain/hashtag/hashtag.entity";
import { GetAlbumsResponseDto } from "../dto/getAlbumsResponse.dto";
import { GetGroupInfoResponseDto } from "../dto/getGroupInfoResponse.dto";

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockGroupRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  softRemove: jest.fn(),
  getGroupQuery: jest.fn(),
  leaveGroupQuery: jest.fn(),
  getAlbumsQuery: jest.fn(),
  getHashTagsQuery: jest.fn(),
});

const mockConnection = () => ({
  transaction: jest.fn(),
  createQueryRunner: () => ({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      getRepository: () => ({
        findOne: jest.fn(),
        save: jest.fn(),
      }),
    },
  }),
});

type MockGroupRepository = Partial<Record<keyof GroupRepository, jest.Mock>>;

describe("GroupService", () => {
  let groupService: GroupService;
  let groupRepository: MockGroupRepository;

  let user: User;
  let testUser: User;
  let existsGroup: Group;
  let updateGroup: Group;
  let existsAlbum1: Album;
  let existsAlbum2: Album;
  let existsPost1: Post;
  let existsPost2: Post;
  let existsPost3: Post;
  let existsPost4: Post;
  let existsHashTag1: HashTag;
  let existsHashTag2: HashTag;
  let attendGroupReqiestDto: AttendGroupRequestDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: getRepositoryToken(GroupRepository), useValue: mockGroupRepository() },
        { provide: getRepositoryToken(UserRepository), useValue: mockUserRepository() },
        { provide: Connection, useValue: mockConnection() },
      ],
    }).compile();

    groupService = module.get<GroupService>(GroupService);
    groupRepository = module.get<MockGroupRepository>(getRepositoryToken(GroupRepository));

    initData();
  });

  describe("getGroupInfo()", () => {
    it("그룹 정보 조회 성공", async () => {
      groupRepository.getGroupQuery.mockResolvedValue(existsGroup);
      const group = GetGroupInfoResponseDto.returnDto(existsGroup);
      const result = await groupService.getGroupInfo(1);

      expect(result).toStrictEqual(group);
    });
  });

  describe("getAlbums()", () => {
    it("그룹 정보 수정 성공", async () => {
      groupRepository.getAlbumsQuery.mockResolvedValue(existsGroup);
      const group = makeResultAlbum();
      const result = await groupService.getAlbums(1);

      expect(result).toStrictEqual(group);
    });
  });

  describe("updateAlbumOrder()", () => {
    it("앨범 순서 수정 성공", async () => {
      groupRepository.update.mockResolvedValue(updateGroup);
      const result = await groupService.updateAlbumOrder(1, { albumOrder: "1,2" });

      expect(result).toStrictEqual(updateGroup);
    });
  });

  describe("getHashTags()", () => {
    it("해시태그 조회 성공", async () => {
      groupRepository.getHashTagsQuery.mockResolvedValue(existsGroup);
      const hashtags = makeResultHashTag();
      const result = await groupService.getHashTags(1);

      expect(result).toStrictEqual(hashtags);
    });
  });

  const makeResultAlbum = () => {
    const albums = [existsAlbum2, existsAlbum1];

    return GetAlbumsResponseDto.returnDto(albums);
  };

  const makeResultHashTag = () => {
    const hashtags = [existsHashTag1, existsHashTag2];

    return { hashtags: hashtags };
  };

  const initData = () => {
    initUser();
    initGroup();
    initHashTag();
    existsGroup.hashtags = [existsHashTag1, existsHashTag2];
    initAlbumAndPost();
    existsGroup.albums = [existsAlbum1, existsAlbum2];

    attendGroupReqiestDto = new AttendGroupRequestDto();
    attendGroupReqiestDto.code = "existsCode";
  };

  const initUser = () => {
    user = new User();
    user.userId = 1;
    user.groups = [new Group()];
    testUser = new User();
    testUser.userId = 2;
  };
  const initGroup = () => {
    existsGroup = new Group();
    existsGroup.groupId = 1;
    existsGroup.groupImage = "existsImg";
    existsGroup.groupName = "existsName";
    existsGroup.groupCode = "existsCode";
    existsGroup.albumOrder = "2,1";
    existsGroup.users = [user, testUser];

    updateGroup = new Group();
    updateGroup.groupId = 1;
    updateGroup.albumOrder = "1,2";
  };
  const initAlbumAndPost = () => {
    existsAlbum1 = new Album();
    existsAlbum1.albumId = 1;
    existsAlbum1.albumName = "albumName1";
    existsAlbum1.base = false;

    existsPost1 = new Post();
    existsPost1.postId = 1;
    existsPost1.postTitle = "title1";
    existsPost1.postLatitude = 36;
    existsPost1.postLongitude = 45;
    existsPost1.hashtags = [existsHashTag1];
    existsPost2 = new Post();
    existsPost2.postId = 2;
    existsPost2.postTitle = "title2";
    existsPost2.postLatitude = 36;
    existsPost2.postLongitude = 45;
    existsAlbum1.posts = [existsPost1, existsPost2];

    existsAlbum2 = new Album();
    existsAlbum2.albumId = 2;
    existsAlbum2.albumName = "albumName2";
    existsAlbum2.base = true;

    existsPost3 = new Post();
    existsPost3.postId = 3;
    existsPost3.postTitle = "title3";
    existsPost3.postLatitude = 36;
    existsPost3.postLongitude = 45;
    existsPost4 = new Post();
    existsPost4.postId = 4;
    existsPost4.postTitle = "title4";
    existsPost4.postLatitude = 36;
    existsPost4.postLongitude = 45;
    existsAlbum2.posts = [existsPost3, existsPost4];
  };
  const initHashTag = () => {
    existsHashTag1 = new HashTag();
    existsHashTag1.hashtagId = 1;
    existsHashTag1.hashtagContent = "tagtitle1";
    existsHashTag1.posts = [existsPost1];
    existsHashTag2 = new HashTag();
    existsHashTag2.hashtagId = 2;
    existsHashTag2.hashtagContent = "tagtitle2";
  };
});
