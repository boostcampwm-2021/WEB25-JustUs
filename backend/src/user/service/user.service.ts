import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registeredUser(userEmail: string, userNickname: string, userImage: string): Promise<User | undefined> {
    let user = await this.userRepository.findOne({ userEmail });
    if (!user) user = await this.userRepository.saveUser(userEmail, userNickname, userImage);

    return user;
  }

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find();
    if (!user) {
      throw new NotFoundException("Can not find User");
    }

    return user;
  }
}
