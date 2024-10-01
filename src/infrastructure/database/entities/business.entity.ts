import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'business',
})
export class BusinessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 45 })
  document_type: string;

  @Column({ unique: true })
  document_number: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 75, nullable: true })
  email: string;

  @Column({ length: 45, nullable: true })
  phone: string;

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
}
