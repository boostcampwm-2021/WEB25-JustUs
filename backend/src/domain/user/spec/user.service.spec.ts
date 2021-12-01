import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { Group } from "src/domain/group/group.entity";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";
import { UserService } from "../user.service";

const mockUserRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  getGroupsQuery: jest.fn(),
});

type MockUserRepository = Partial<Record<keyof UserRepository, jest.Mock>>;

describe("UserService", () => {
  let userService: UserService;
  let userRepository: MockUserRepository;

  let existsUser;
  let saveUser;
  let updateUser;
  let existsGroup1;
  let existsGroup2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(UserRepository), useValue: mockUserRepository() }],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserRepository));

    initdata();
  });

  describe("registeredUser()", () => {
    it("존재하지 않는 유저 등록 성공", async () => {
      userRepository.save.mockResolvedValue(saveUser);
      const result = await userService.registeredUser(saveUser);

      expect(result).toStrictEqual(saveUser);
    });
    it("이미 등록된 유저 정보 조회", async () => {
      userRepository.findOne.mockResolvedValue(existsUser);
      const result = await userService.registeredUser(existsUser);

      expect(result).toStrictEqual(existsUser);
    });
  });

  describe("getUserInfo()", () => {
    it("유저 정보 조회 성공", async () => {
      userRepository.findOne.mockResolvedValue(existsUser);
      const user = makeUserInfo();
      const result = await userService.getUserInfo(1);

      expect(result).toStrictEqual(user);
    });
  });

  describe("update", () => {
    it("리프레시 토큰 업데이트 성공", async () => {
      userRepository.update.mockResolvedValue(updateUser);
      const result = await userService.updateToken(1, "refreshToken2");

      expect(result).toStrictEqual(updateUser);
    });

    it("그룹 순서 업데이트 성공", async () => {
      userRepository.update.mockResolvedValue(updateUser);
      const result = await userService.updateGroupOrder(1, { groupOrder: "1,2" });

      expect(result).toStrictEqual(updateUser);
    });
  });

  describe("getGroups()", () => {
    it("유저의 그룹 정보 조회 성공", async () => {
      userRepository.getGroupsQuery.mockResolvedValue(existsUser);
      const user = makeUserGroups();
      const result = await userService.getGroups(1);

      expect(result).toStrictEqual(user);
    });
  });

  const makeUserInfo = () => {
    return new UserInfoResponseDto(existsUser.userNickname, existsUser.profileImage, existsUser.userId);
  };

  const makeUserGroups = () => {
    const gruops = [existsGroup2, existsGroup1];

    return { groups: gruops };
  };

  const initdata = () => {
    initUser();
    initGroup();
  };

  const initUser = () => {
    existsUser = new User();
    existsUser.userId = 1;
    existsUser.userEmail = "email1";
    existsUser.userNickname = "nickname1";
    existsUser.profileImage = "image1";
    existsUser.refreshToken = "refreshToken1";
    existsUser.groupOrder = "2,1";

    saveUser = new User();
    saveUser.userId = 2;
    saveUser.userEmail = "email2";
    saveUser.userNickname = "nickname2";
    saveUser.profileImage = "image2";

    updateUser = new User();
    updateUser.refreshToken = "refreshToken2";
    updateUser.groupOrder = "1,2";
  };

  const initGroup = () => {
    existsGroup1 = new Group();
    existsGroup1.groupId = 1;
    existsGroup2 = new Group();
    existsGroup2.groupId = 2;
    existsUser.groups = [existsGroup1, existsGroup2];
  };
});
