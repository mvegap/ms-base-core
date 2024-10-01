import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'payment_types',
})
export class PaymentTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
