import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/User/entities/role.entity';
import { RoleEnum } from 'src/User/enums/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await Promise.all(
      Object.values(RoleEnum).map(async roleName => {
        const roleExists = await this.roleRepository.findOne({ where: { name: roleName } });
        if (!roleExists) {
          const role = this.roleRepository.create({ name: roleName });
          await this.roleRepository.save(role);
        }
      }),
    );
  }
}
