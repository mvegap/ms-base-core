import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/infrastructure/database/entities/business.entity';
import { BusinessRepository } from 'src/infrastructure/repositories/business.repository';
import { BusinessService } from './business.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  providers: [BusinessService, BusinessRepository, Logger],
  exports: [BusinessService],
})
export class BusinessModule {}
