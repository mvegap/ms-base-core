import { UserEntity } from 'src/infrastructure/database/entities/user.entity';

export interface IUserRepository {
  validate(username: string, password: string): Promise<UserEntity>;
  create(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findByUsername(username: string): Promise<UserEntity>;
}
