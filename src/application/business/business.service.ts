import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BusinessEntity } from 'src/infrastructure/database/entities/business.entity';
import { BusinessRepository } from 'src/infrastructure/repositories/business.repository';
import * as cache from 'memory-cache';
import { KEY_BUSINESS } from '../../shared/constants';

@Injectable()
export class BusinessService {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<void> {
    let business = cache.get(KEY_BUSINESS);

    if (!business) {
      business = await this.businessRepository.findAll();
      business = business.map((business) => {
        return this.mapBusinessEntityToBusinessDTO(business);
      });
      cache.put(KEY_BUSINESS, business);
      this.logger.log(
        'Business cached successfully',
        'BusinessService.findAll',
      );
    }

    return business as any;
  }

  async findByDocument(type: string, number: string): Promise<void> {
    const business = await this.businessRepository.findByDocument(type, number);

    if (!business) {
      throw new BadRequestException('Business not found');
    }

    return business as any;
  }

  async delete(id: string): Promise<void> {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new BadRequestException('Business not found');
    }

    await this.businessRepository.delete(id);

    cache.del(KEY_BUSINESS);
  }

  private mapBusinessEntityToBusinessDTO(business: BusinessEntity): object {
    return {
      id: business.id,
      document_type: business.document_type,
      document_number: business.document_number,
      name: business.name,
      email: business.email,
      phone: business.phone,
      address: business.address,
    };
  }
}
