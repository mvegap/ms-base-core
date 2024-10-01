import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/infrastructure/database/entities/user.entity';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly logger: Logger,
  ) {}

  async getUserByCredentials(username: string, password: string) {
    const user = await this.userRepository.validate(username, password);

    if (!user) {
      this.logger.log(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      this.logger.error(
        `User ${username} not found`,
        'UserService.findByUsername',
      );
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async storeToken(id: string, accessToken: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      this.logger.error(`User ${id} not found`, 'UserService.storeToken');
      throw new BadRequestException('User not found');
    }

    user.access_token = accessToken;
    user.last_login_at = new Date();

    const result = await this.userRepository.update(id, user);

    return result as any;
  }

  async findAll(): Promise<void> {
    const users = await this.userRepository.findAll();

    return users as any;
  }
}
