import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeEntity } from 'src/infrastructure/database/entities/payment-type.entity';
import { PaymentTypeRepository } from 'src/infrastructure/repositories/payment-type.repository';
import { PaymentTypeService } from './payment-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTypeEntity])],
  providers: [PaymentTypeService, PaymentTypeRepository, Logger],
  exports: [PaymentTypeService],
})
export class PaymentTypeModule {}
