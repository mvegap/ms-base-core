import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
// services
import { AppService } from './app.service';
// modules
import { AuthModule } from './application/auth/auth.module';
import { BusinessModule } from './application/business/business.module';
import { RoleModule } from './application/role/role.module';
import { UserModule } from './application/user/user.module';
import { PaymentTypeModule } from './application/payment-type/payment-type.module';
// controllers
import { HealthcheckController } from './presentation/http/healthcheck.controller';
import { BusinessController } from './presentation/http/v1/business.controller';
import { AuthController } from './presentation/http/v1/auth.controller';
// interceptors
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { AllExceptionsFilter } from './shared/filters/exceptions.filter';
import { PaymentTypeController } from './presentation/http/v1/payment-type.controller';
import { UserController } from './presentation/http/v1/user.controller';
import { RoleController } from './presentation/http/v1/role.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(AppService.loggerConfig()),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        ...AppService.typeORMConfig(),
      }),
      inject: [ConfigService],
    }),
    BusinessModule,
    RoleModule,
    UserModule,
    AuthModule,
    PaymentTypeModule,
  ],
  controllers: [
    HealthcheckController,
    BusinessController,
    AuthController,
    PaymentTypeController,
    UserController,
    RoleController,
  ],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
