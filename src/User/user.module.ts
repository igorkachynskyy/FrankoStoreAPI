import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { FileModule } from 'src/File/file.module';
import { DiscountType } from 'src/DiscountType/entities/discount-type';
import { DatabaseModule } from 'src/common/Database/database.module';

@Module({
  imports: [DatabaseModule.forFeature([User, DiscountType]), FileModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
