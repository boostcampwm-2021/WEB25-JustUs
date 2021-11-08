import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDto } from "src/dto/user/register-user.dto";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";
import { FindUserResponseDto } from "src/dto/user/userInfoResponse.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registeredUser(registerUserDto: RegisterUserDto): Promise<User | undefined> {
    const userEmail = registerUserDto.userEmail;

    let user = await this.userRepository.findOne({ userEmail });
    if (!user) user = await this.userRepository.saveUser(registerUserDto);

    return user;
  }

  async findUserInfo(userId: number): Promise<FindUserResponseDto> {
    const user = await this.userRepository.findOne({ userId });

    if (!user) {
      throw new NotFoundException("Can not find User");
    }
    const { profileImage, userNickname } = user;
    return { profileImage, userNickname };
  }
}
