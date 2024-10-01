import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaymentTypeRepository } from 'src/domain/repositories/payment-type';
import { PaymentTypeEntity } from '../database/entities/payment-type.entity';

@Injectable()
export class PaymentTypeRepository implements IPaymentTypeRepository {
  constructor(
    @InjectRepository(PaymentTypeEntity)
    private readonly paymentTypeRepository: Repository<PaymentTypeEntity>,
    private readonly logger: Logger,
  ) {}

  async create(name: string): Promise<PaymentTypeEntity> {
    try {
      const paymentType = new PaymentTypeEntity();
      paymentType.name = name;

      return await this.paymentTypeRepository.save(paymentType);
    } catch (error) {
      this.logger.error(error.message, 'PaymentTypeRepository.create');
    }
  }

  async findByName(name: string): Promise<PaymentTypeEntity> {
    try {
      return await this.paymentTypeRepository.findOne({
        where: { name },
      });
    } catch (error) {
      this.logger.error(error.message, 'PaymentTypeRepository.findByName');
    }
  }

  async findAll(): Promise<PaymentTypeEntity[]> {
    try {
      return await this.paymentTypeRepository.find();
    } catch (error) {
      this.logger.error(error.message, 'PaymentTypeRepository.findAlll');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.paymentTypeRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message, 'PaymentTypeRepository.delete');
    }
  }
}
