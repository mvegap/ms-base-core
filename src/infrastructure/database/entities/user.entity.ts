import { genSalt, hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 75 })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.id, {
    eager: true,
  })
  role: RoleEntity;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date;

  @Column({ type: 'text', nullable: true, select: false })
  access_token: string;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    select: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
  })
  updated_at: Date;

  @BeforeInsert()
  private async setPassword(password: string) {
    const salt = await genSalt(10);
    this.password = await hash(password || this.password, salt);
  }
}
