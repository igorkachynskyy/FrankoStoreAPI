import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AccessJwtAuthenticationGuard } from 'src/Auth/guards/access-jwt-authentication.guard';
import { UserService } from './user.service';
import { UpdateUserInput } from './inputs/update-user.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(AccessJwtAuthenticationGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public async updateMyUser(@CurrentUser() user: User, @Args('user') userInput: UpdateUserInput) {
    return await this.userService.updateUser(user.id, userInput);
  }

  @Query(() => User)
  public getMysUser(@CurrentUser() user: User): User {
    return user;
  }
}
