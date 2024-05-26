import { UserPayload } from './models/user.payload.model';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthenticationInput } from './inputs/authentication.input';
import { User } from 'src/User/entities/user.entity';
import { CreateUserInput } from 'src/User/inputs/create-user.input';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/User/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationPayload } from './models/authentication-payload.model';
import { ResetPasswordInput } from 'src/Auth/inputs/reset-password.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(authInput: AuthenticationInput) {
    const user: User | null = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: authInput.login })
      .orWhere('user.email = :email', { email: authInput.login })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid login');
    }

    const isValidPassword: boolean = await bcrypt.compare(authInput.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.createTokens(user);
  }

  public async register(userInput: CreateUserInput): Promise<AuthenticationPayload> {
    let user: User = new User({});
    user.email = userInput.email;
    user.username = userInput.username;
    user.firstName = userInput.firstName;
    user.lastName = userInput.lastName;
    user.passwordHash = await bcrypt.hash(userInput.password, this.configService.get<number>('SALT_ROUNDS'));
    user.phone = userInput.phone;
    user.roles = [];
    for (let role of userInput.roles) {
      user.roles.push(await this.roleRepository.findOneOrFail({ where: { name: role } }));
    }
    user = await this.userRepository.save(user);
    return this.createTokens(user);
  }

  public async refresh(userId: number): Promise<AuthenticationPayload> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException("User doesn't exist in database");

    return this.createTokens(user);
  }

  public async resetPassword(userId: number, resetPasswordInput: ResetPasswordInput): Promise<AuthenticationPayload> {
    const user = await this.userRepository.findOneOrFail({ where: { id: userId } })
    const isValidPassword: boolean = await bcrypt.compare(resetPasswordInput.oldPassword, user.passwordHash);
    if (isValidPassword) {
      user.passwordHash = await bcrypt.hash(resetPasswordInput.newPassword, this.configService.get<number>('SALT_ROUNDS'));
      return this.createTokens(await this.userRepository.save(user))
    }

    throw new BadRequestException("Wrong password!");
  }

  private createTokens(user: User): AuthenticationPayload {
    const userPayload: UserPayload = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign(userPayload, {
      secret: this.configService.get('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(userPayload, {
      secret: this.configService.get('REFRESH_SECRET_KEY'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    });
    return { accessToken, refreshToken };
  }
}
