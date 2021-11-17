import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "src/dto/user/userInfo.dto";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";
import { UserInfoResponseDto } from "src/dto/user/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/dto/user/updateUserInfoRequest.dto";
import { UpdateGroupOrderRequestDto } from "src/dto/user/updateGroupOrderRequest.dto";
import { UpdateResult } from "typeorm";

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
    return { profileImage, userNickname };
  }

  async updateUserInfo(userId: number, updateUserInfoRequestDto: UpdateUserInfoRequestDto): Promise<string> {
    const { profileImage, userNickname } = updateUserInfoRequestDto;
    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundException(`Not found user with the id ${userId}`);

    this.userRepository.update(userId, { profileImage, userNickname });

    return "UserInfo update success!!";
  }

  async updateToken(userId: number, refreshToken: string): Promise<UpdateResult> {
    return this.userRepository.update(userId, { refreshToken });
  }

  async updateGroupOrder(userId: number, updateGroupOrderRequestDto: UpdateGroupOrderRequestDto): Promise<string> {
    const { groupOrder } = updateGroupOrderRequestDto;
    this.userRepository.update(userId, { groupOrder });

    return "GroupOrder update success!!";
  }
}
