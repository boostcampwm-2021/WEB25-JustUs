import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group.repository";
import { CreateGroupRequestDto } from "src/dto/group/createGroupRequest.dto";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createGroup(createGroupRequestDto: CreateGroupRequestDto): Promise<number> {
    // 랜덤 코드 생성해서 그룹 생성
    const { userId, groupImage, groupName } = createGroupRequestDto;
    const groupCode = this.createInvitaionCode();

    const user = await this.userRepository.findOne(userId, { relations: ["groups"] });
    const group = await this.groupRepository.save({
      groupImage: groupImage,
      groupName: groupName,
      groupCode: groupCode,
    });
    user.groups.push(group);
    await this.userRepository.save(user);

    return group.groupId;
  }

  createInvitaionCode(): string {
    return "code";
  }
}
