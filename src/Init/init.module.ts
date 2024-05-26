import { Module } from '@nestjs/common';
import { Role } from 'src/User/entities/role.entity';
import { DatabaseModule } from 'src/common/Database/database.module';
import { RoleSeeder } from './seeders/role.seeder';

@Module({
  imports: [DatabaseModule.forFeature([Role])],
  providers: [RoleSeeder],
})
export class InitModule {}
