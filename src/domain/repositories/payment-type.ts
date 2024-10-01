import { PaymentTypeEntity } from 'src/infrastructure/database/entities/payment-type.entity';

export interface IPaymentTypeRepository {
  create(name: string): Promise<PaymentTypeEntity>;
  findByName(name: string): Promise<PaymentTypeEntity>;
  findAll(): Promise<PaymentTypeEntity[]>;
  delete(id: string): Promise<void>;
}
