import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBusinessRepository } from 'src/domain/repositories/business';
import { Repository } from 'typeorm';
import { BusinessEntity } from '../database/entities/business.entity';

@Injectable()
export class BusinessRepository implements IBusinessRepository {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepository: Repository<BusinessEntity>,
    private readonly logger: Logger,
  ) {}

  async create(business: BusinessEntity): Promise<BusinessEntity> {
    try {
      return await this.businessRepository.save(business);
    } catch (error) {
      this.logger.error(error.message, 'BusinessRepository.create');
    }
  }

  async findById(id: string): Promise<BusinessEntity> {
    try {
      return await this.businessRepository.findOne({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message, 'BusinessRepository.findById');
    }
  }

  async findByDocument(type: string, number: string): Promise<BusinessEntity> {
    try {
      return await this.businessRepository.findOne({
        where: { document_type: type, document_number: number },
      });
    } catch (error) {
      this.logger.error(error.message, 'BusinessRepository.findByDocument');
    }
  }

  async findAll(): Promise<BusinessEntity[]> {
    try {
      return await this.businessRepository.find();
    } catch (error) {
      this.logger.error(error.message, 'BusinessRepository.findAll');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.businessRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message, 'BusinessRepository.delete');
    }
  }
}
