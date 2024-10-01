import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { RoleService } from 'src/application/role/role.service';
import { RoleAllowed, Roles } from 'src/shared/decorators/role.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleAllowed(Roles.SUPERADMIN)
  async findAll(): Promise<void> {
    this.logger.log('Get all roles');
    return this.roleService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`Delete role: ${id}`);
    return this.roleService.delete(id);
  }
}
