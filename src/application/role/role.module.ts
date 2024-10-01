import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/infrastructure/database/entities/role.entity';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService, RoleRepository, Logger],
  exports: [RoleService],
})
export class RoleModule {}
