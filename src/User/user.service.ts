import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async updateUser(userId: number, userInput: UpdateUserInput) {
    await this.userRepository.update({ id: userId }, userInput);
    return await this.userRepository.findOne({ where: { id: userId } });
  }
}
