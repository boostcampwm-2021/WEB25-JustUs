import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "src/domain/user/dto/userInfo.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { CustomFile } from "src/custom/myFile/customFile";
import { UserInfoResponseDto } from "src/domain/user/dto/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/domain/user/dto/updateUserInfoRequest.dto";
import { UpdateGroupOrderRequestDto } from "src/domain/user/dto/updateGroupOrderRequest.dto";
import { GetGroupsResponseDto } from "src/domain/user/dto/getGroupsResponse.dto";
import { UpdateUserInfoResponseDto } from "src/domain/user/dto/updateUserInfoResponse.dto";
import { UpdateResult } from "typeorm";
import { getImageUrl } from "src/util/imageUrl";
import { ArrayToObject, reArrange } from "src/util/changeObject";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registeredUser(registerUserDto: UserInfo): Promise<User | undefined> {
    const userEmail = registerUserDto.userEmail;

    let user = await this.userRepository.findOne({ userEmail });
    if (!user) user = await this.userRepository.save(registerUserDto);

    return user;
  }

  async getUserInfo(userId: number): Promise<UserInfoResponseDto> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    return UserInfoResponseDto.returnDto(user);
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
      clearImage === 1
        ? { profileImage: process.env.JUSTUS_USER_BASE_IMG, userNickname }
        : { profileImage: user.profileImage, userNickname };
    const updateObject = profileImage === undefined ? checkClearImage : { profileImage, userNickname };

    this.userRepository.update(userId, updateObject);

    return UpdateUserInfoResponseDto.returnDto(updateObject.profileImage);
  }

  async updateToken(userId: number, refreshToken: string): Promise<UpdateResult> {
    return await this.userRepository.update(userId, { refreshToken });
  }

  async updateGroupOrder(
    userId: number,
    updateGroupOrderRequestDto: UpdateGroupOrderRequestDto,
  ): Promise<UpdateResult> {
    const { groupOrder } = updateGroupOrderRequestDto;

    return await this.userRepository.update(userId, { groupOrder });
  }

  async getGroups(userId: number): Promise<GetGroupsResponseDto> {
    const groupsInfo = await this.userRepository.getGroupsQuery(userId);
    if (!groupsInfo) throw new NotFoundException(`Not found user with the id ${userId}`);

    const { groupOrder, groups } = groupsInfo;

    const groupsObject = ArrayToObject(groups, "groupId");

    const reArrangedGroups = reArrange(groupOrder, groupsObject);

    return GetGroupsResponseDto.returnDto(reArrangedGroups);
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOne(userId);
  }
}
