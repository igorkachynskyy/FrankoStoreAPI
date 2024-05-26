import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class CheckExistingUserPipe implements PipeTransform<CreateUserInput, Promise<CreateUserInput>> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async transform(value: CreateUserInput): Promise<CreateUserInput> {
    const user: User | null = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: value.username })
      .orWhere('user.email = :email', { email: value.email })
      .getOne();

    if (user) {
      throw new ConflictException('User already exist!');
    }
    return value;
  }
}
