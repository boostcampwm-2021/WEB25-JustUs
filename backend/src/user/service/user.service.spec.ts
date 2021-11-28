import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRepository } from "../user.repository";
import { UserService } from "./user.service";

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(UserRepository), useValue: mockUserRepository() }],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserRepository));
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });
});
