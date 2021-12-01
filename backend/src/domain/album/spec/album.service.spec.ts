import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Group } from "src/domain/group/group.entity";
import { GroupRepository } from "src/domain/group/group.repository";
import { Connection } from "typeorm";
import { Album } from "../album.entity";
import { AlbumRepository } from "../album.repository";
import { AlbumService } from "../album.service";

const mockAlbumRepository = () => ({
  findOne: jest.fn(),
  update: jest.fn(),
});

const mockGroupRepository = () => ({
  getBaseAlbumQuery: jest.fn(),
});
const mockConnection = () => ({});

type MockAlbumRepository = Partial<Record<keyof AlbumRepository, jest.Mock>>;
type MockGroupRepository = Partial<Record<keyof GroupRepository, jest.Mock>>;

describe("AlbumService", () => {
  let albumService: AlbumService;
  let albumRepository: MockAlbumRepository;
  let groupRepository: MockGroupRepository;

  let existsGroup: Group;
  let existsAlbum: Album;
  let existsAlbum2: Album;
  let updateAlbum: Album;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: getRepositoryToken(AlbumRepository), useValue: mockAlbumRepository() },
        {
          provide: getRepositoryToken(GroupRepository),
          useValue: mockGroupRepository(),
        },
        { provide: Connection, useValue: mockConnection() },
      ],
    }).compile();

    albumService = module.get<AlbumService>(AlbumService);
    albumRepository = module.get<MockAlbumRepository>(getRepositoryToken(AlbumRepository));
    groupRepository = module.get<MockGroupRepository>(getRepositoryToken(GroupRepository));

    initData();
  });

  describe("updateAlbumInfo()", () => {
    it("앨범 수정 성공", async () => {
      albumRepository.findOne.mockResolvedValue(existsAlbum);
      albumRepository.update.mockResolvedValue(updateAlbum);

      const result = await albumService.updateAlbumInfo(1, { albumName: "updateName" });

      expect(result).toBe("AlbumInfo update success!!");
    });
  });

  describe("deleteAlbum()", () => {
    it("기본 앨범 조회 성공", async () => {
      groupRepository.getBaseAlbumQuery.mockResolvedValue(existsGroup);

      const result = await albumService.getBaseAlbumId(1);

      expect(result).toStrictEqual(existsAlbum);
    });
  });

  const initData = () => {
    existsGroup = new Group();
    existsGroup.groupId = 1;
    existsGroup.albums = [existsAlbum, existsAlbum2];

    existsAlbum = new Album();
    existsAlbum.albumId = 1;
    existsAlbum.albumName = "existsAlbum";
    existsAlbum.base = true;

    updateAlbum = new Album();
    updateAlbum.albumId = 1;
    updateAlbum.albumName = "updateName";

    existsAlbum2 = new Album();
    existsAlbum2.albumId = 2;
    existsAlbum2.albumName = "existsAlbum2";
    existsAlbum2.base = false;
  };
});
