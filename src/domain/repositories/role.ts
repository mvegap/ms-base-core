import { RoleEntity } from 'src/infrastructure/database/entities/role.entity';

export interface IRoleRepository {
  create(role: RoleEntity): Promise<RoleEntity>;
  findById(id: string): Promise<RoleEntity>;
  findByName(name: string): Promise<RoleEntity>;
  findAll(): Promise<RoleEntity[]>;
  delete(id: string): Promise<void>;
}
