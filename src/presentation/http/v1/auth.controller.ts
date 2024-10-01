import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/application/auth/auth.service';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/application/auth/guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req): Promise<any> {
    this.logger.log('Login');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    this.logger.log('Get Profile');
    return req.user;
  }
}
