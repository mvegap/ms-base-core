import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleRepository } from 'src/domain/repositories/role';
import { RoleEntity } from '../database/entities/role.entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly logger: Logger,
  ) {}

  async create(role: RoleEntity): Promise<RoleEntity> {
    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      this.logger.error(error.message, 'RoleRepository.create');
    }
  }

  async findById(id: string): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOne({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message, 'RoleRepository.findById');
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      this.logger.error(error.message, 'RoleRepository.findAll');
    }
  }

  async findByName(name: string): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOne({
        where: { name },
      });
    } catch (error) {
      this.logger.error(error.message, 'RoleRepository.findByName');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.roleRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message, 'RoleRepository.delete');
    }
  }
}
