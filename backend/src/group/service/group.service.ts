import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group.repository";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { UserRepository } from "src/user/user.repository";
import { Group } from "../group.entity";
import { AttendGroupRequestDto } from "src/dto/group/attendGroupRequest.dto";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createGroup(createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    const { userId, groupImage, groupName } = createGroupRequestDto;
    const groupCode = await this.createInvitaionCode();

    const group = await this.groupRepository.save({
      groupImage: groupImage,
      groupName: groupName,
      groupCode: groupCode,
    });

    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });
    user.groups.push(group);
    await this.userRepository.save(user);

    return group.groupId;
  }

  async createInvitaionCode(): Promise<string> {
    let code: string;
    let exists: Group;
    do {
      code = Math.random().toString(36).substr(2, 11);
      exists = await this.groupRepository.findOne({ groupCode: code });
    } while (exists);

    return code;
  }

  async attendGroup(attendGroupRequestDto: AttendGroupRequestDto): Promise<number> {
    const { userId, code } = attendGroupRequestDto;

    const group = await this.groupRepository.findOne({ groupCode: code });
    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });

    user.groups.push(group);
    await this.userRepository.save(user);

    return group.groupId;
  }
}
