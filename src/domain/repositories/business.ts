import { BusinessEntity } from 'src/infrastructure/database/entities/business.entity';

export interface IBusinessRepository {
  create(business: BusinessEntity): Promise<BusinessEntity>;
  findById(id: string): Promise<BusinessEntity>;
  findByDocument(type: string, number: string): Promise<BusinessEntity>;
  findAll(): Promise<BusinessEntity[]>;
  delete(id: string): Promise<void>;
}
