import { RefreshJwtAuthenticationGuard } from './guards/refresh-jwt-authentication.guard';
import { BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/User/inputs/create-user.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationPayload } from './models/authentication-payload.model';
import { AuthenticationInput } from './inputs/authentication.input';
import { CheckExistingUserPipe } from 'src/User/check-existing-user.pipe';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/User/entities/user.entity';
import { ResetPasswordInput } from 'src/Auth/inputs/reset-password.input';
import { AccessJwtAuthenticationGuard } from 'src/Auth/guards/access-jwt-authentication.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authenticateService: AuthService) { }

  @Mutation(() => AuthenticationPayload)
  async login(@Args('authenticationInput') authenticationInput: AuthenticationInput) {
    try {
      const response = await this.authenticateService.login(authenticationInput);
      return response;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @Mutation(() => AuthenticationPayload)
  async register(@Args('user', CheckExistingUserPipe) userDto: CreateUserInput) {
    try {
      const response = await this.authenticateService.register(userDto);
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(RefreshJwtAuthenticationGuard)
  @Mutation(() => AuthenticationPayload)
  async refresh(@CurrentUser() user: User) {
    if (!user) throw new UnauthorizedException();

    return await this.authenticateService.refresh(user.id);
  }

  @UseGuards(AccessJwtAuthenticationGuard)
  @Mutation(() => AuthenticationPayload)
  async resetPassword(@CurrentUser() user: User, @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput) {
    if (!user) throw new UnauthorizedException();

    return await this.authenticateService.resetPassword(user.id, resetPasswordInput);
  }
}
