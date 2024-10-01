import { Injectable, Logger } from '@nestjs/common';
import { PaymentTypeRepository } from 'src/infrastructure/repositories/payment-type.repository';
import * as cache from 'memory-cache';
import { KEY_PAYMENT_TYPES } from '../../shared/constants';

@Injectable()
export class PaymentTypeService {
  constructor(
    private readonly paymentTypeRepository: PaymentTypeRepository,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<void> {
    let paymentTypes = cache.get(KEY_PAYMENT_TYPES);

    if (!paymentTypes) {
      paymentTypes = await this.paymentTypeRepository.findAll();
      cache.put(KEY_PAYMENT_TYPES, paymentTypes);
      this.logger.log(
        `Payment Types cached successfully`,
        'PaymentTypeService.findAll',
      );
    }

    return paymentTypes as any;
  }

  async delete(id: string): Promise<void> {
    const result = await this.paymentTypeRepository.delete(id);

    cache.del(KEY_PAYMENT_TYPES);

    return result as any;
  }
}
