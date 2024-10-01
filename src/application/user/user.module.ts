import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/infrastructure/database/entities/role.entity';
import { UserEntity } from 'src/infrastructure/database/entities/user.entity';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [
    UserService,
    UserRepository,
    RoleRepository,
    Logger,
  ],
  exports: [UserService],
})
export class UserModule {}
