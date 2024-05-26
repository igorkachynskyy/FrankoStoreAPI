import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';
import { RefreshStrategy } from './strategies/refresh-jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/User/entities/role.entity';
import { User } from 'src/User/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from 'src/File/file.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
    FileModule,
    JwtModule.register({}),
    PassportModule.register({}),
  ],
  providers: [AuthService, AccessJwtStrategy, RefreshStrategy, AuthResolver],
})
export class AuthModule {}
