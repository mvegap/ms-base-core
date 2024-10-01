import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/repositories/user';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: Logger,
  ) {}

  async validate(username: string, password: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { username, password },
      });
    } catch (error) {
      this.logger.error(error.message, 'UserRepository.validate');
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(error.message, 'UserRepository.create');
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message, 'UserRepository.findById');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(error.message, 'UserRepository.findAll');
    }
  }

  async findByUsername(username: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { username },
      });
    } catch (error) {
      this.logger.error(error.message, 'UserRepository.findByUsername');
    }
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    try {
      return this.userRepository.save({ id, ...user });
    } catch (error) {
      this.logger.error(error.message, 'UserRepository.update');
    }
  }
}
