import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDto } from "src/dto/register-user.dto";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";

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

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find();
    if (!user) {
      throw new NotFoundException("Can not find User");
    }

    return user;
  }
}
