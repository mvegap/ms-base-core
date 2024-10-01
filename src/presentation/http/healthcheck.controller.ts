import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('healthcheck')
@ApiTags('Healthcheck')
export class HealthcheckController {
  constructor() {}

  @Get()
  check() {
    return { message: 'OK' };
  }
}
