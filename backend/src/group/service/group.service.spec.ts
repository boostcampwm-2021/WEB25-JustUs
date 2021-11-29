import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { GroupRepository } from "../group.repository";
import { GroupService } from "./group.service";
import { Group } from "../group.entity";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.entity";

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
type MockUserRepository = Partial<Record<keyof UserRepository, jest.Mock>>;

describe("GroupService", () => {
  let groupService: GroupService;
  let groupRepository: MockGroupRepository;
  let userRepository: MockUserRepository;

  let user: User;
  let existsGroup: Group;
  let attendGroupReqiestDto: AttendGroupRequestDto;
  const userId = 1;

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
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserRepository));

    initData();
  });

  const initData = () => {
    user = new User();
    user.userId = 1;
    user.groups = [new Group()];

    existsGroup = new Group();
    existsGroup.groupId = 1;
    existsGroup.groupImage = "existsImg";
    existsGroup.groupName = "existsName";
    existsGroup.groupCode = "existsCode";
    const testUser = new User();
    testUser.userId = 2;
    existsGroup.users = [testUser];

    attendGroupReqiestDto = new AttendGroupRequestDto();
    attendGroupReqiestDto.code = "existsCode";
  };

  describe("attendGroup()", () => {
    it("존재하는 코드로 참가", async () => {
      userRepository.findOne.mockResolvedValue(user);
      groupRepository.findOne.mockResolvedValue(existsGroup);

      const group = await groupService.attendGroup(userId, attendGroupReqiestDto);

      expect(group).toBe(existsGroup.groupId);
    });
  });
});
