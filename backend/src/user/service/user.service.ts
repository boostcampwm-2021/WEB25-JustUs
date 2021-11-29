import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "src/dto/user/userInfo.dto";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";
import { CustomFile } from "src/custom/myFile/customFile";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/dto/user/updateUserInfoRequest.dto";
import { UpdateGroupOrderRequestDto } from "src/dto/user/updateGroupOrderRequest.dto";
import { GetGroupsResponseDto } from "src/dto/user/getGroupsResponse.dto";
import { UpdateUserInfoResponseDto } from "src/dto/user/updateUserInfoResponse.dto";
import { UpdateResult } from "typeorm";
import { getImageUrl } from "src/common/imageUrl";
import { ArrayToObject, reArrange } from "src/common/changeObject";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registeredUser(registerUserDto: UserInfo): Promise<User | undefined> {
    const userEmail = registerUserDto.userEmail;

    let user = await this.userRepository.findOne({ userEmail });
    if (!user) user = await this.userRepository.saveUser(registerUserDto);

    return user;
  }

  async getUserInfo(userId: number): Promise<UserInfoResponseDto> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const { profileImage, userNickname } = user;
    return { profileImage, userNickname, userId };
  }

  async updateUserInfo(
    userId: number,
    file: CustomFile,
    updateUserInfoRequestDto: UpdateUserInfoRequestDto,
  ): Promise<UpdateUserInfoResponseDto> {
    const profileImage = getImageUrl(file);
    const { userNickname, clearImage } = updateUserInfoRequestDto;

    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    const checkClearImage =
      clearImage === 1 ? { profileImage: process.env.JUSTUS_USER_BASE_IMG, userNickname } : { userNickname };
    const updateObject = profileImage === undefined ? checkClearImage : { profileImage, userNickname };

    await this.userRepository.update(userId, updateObject);

    return { profileImage };
  }

  async updateToken(userId: number, refreshToken: string): Promise<UpdateResult> {
    return await this.userRepository.update(userId, { refreshToken });
  }

  async updateGroupOrder(userId: number, updateGroupOrderRequestDto: UpdateGroupOrderRequestDto): Promise<string> {
    const { groupOrder } = updateGroupOrderRequestDto;
    await this.userRepository.update(userId, { groupOrder });

    return "GroupOrder update success!!";
  }

  async getGroups(userId: number): Promise<GetGroupsResponseDto> {
    const groupsInfo = await this.userRepository.getGroupsQuery(userId);
    if (!groupsInfo) throw new NotFoundException(`Not found user with the id ${userId}`);

    const { groupOrder, groups } = groupsInfo;

    const groupsObject = ArrayToObject(groups, "groupId");

    const reArrangedGroups = reArrange(groupOrder, groupsObject);

    return { groups: reArrangedGroups };
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOne(userId);
  }
}
