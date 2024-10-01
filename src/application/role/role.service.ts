import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RoleEntity } from 'src/infrastructure/database/entities/role.entity';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<void> {
    const data = await this.roleRepository.findAll();

    return data as any;
  }

  async delete(id: string): Promise<void> {
    const findRole = await this.roleRepository.findById(id);

    if (!findRole) {
      this.logger.error('Role not found', 'RoleService.delete');
      throw new BadRequestException('Role not found');
    }

    await this.roleRepository.delete(id);

    return [] as any;
  }
}
