import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../models/user.payload.model';
import { AppJwtPayload } from '../models/app-jwt-payload.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/User/entities/user.entity';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: AppJwtPayload): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id: payload.id },
      relations: { roles: true },
    });
    if (!user || user.isDeleted) {
      return null;
    }
    return user;
  }
}
