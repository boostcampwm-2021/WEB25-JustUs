import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { UsersRepository } from "../user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const user = await this.usersRepository.find();
    if (!user) {
      throw new NotFoundException("Can not find User");
    }

    return user;
  }
}
