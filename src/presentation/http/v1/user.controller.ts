import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { UserService } from 'src/application/user/user.service';
import { RoleAllowed, Roles } from 'src/shared/decorators/role.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleAllowed(Roles.SUPERADMIN)
  @Get()
  async findAll(): Promise<void> {
    this.logger.log('Get all users');
    return this.userService.findAll();
  }
}
