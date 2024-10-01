import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { BusinessService } from 'src/application/business/business.service';

@Controller('business')
@ApiTags('Business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<void> {
    this.logger.log('Get all businesses');
    return this.businessService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`Delete business: ${id}`);
    return this.businessService.delete(id);
  }
}
