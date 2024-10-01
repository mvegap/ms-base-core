import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as winston from 'winston';

export class AppService {
  static app_title(): string {
    const { APP_NAME } = process.env;
    return APP_NAME || 'NestJS';
  }

  static environment(): string {
    const { ENVIRONMENT } = process.env;
    return (ENVIRONMENT ? ENVIRONMENT : 'LOCAL').toUpperCase();
  }

  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 3000;
  }

  static logLevel(): string {
    const { LOG_LEVEL } = process.env;
    return (LOG_LEVEL ? LOG_LEVEL : 'info').toLowerCase();
  }

  static loggerConfig(): winston.LoggerOptions {
    const format =
      AppService.environment() !== 'LOCAL'
        ? winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          )
        : winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.colorize(),
            winston.format.ms(),
            winston.format.simple(),
          );

    return {
      level: AppService.logLevel(),
      defaultMeta: {
        applicationName: AppService.app_title(),
        environment: AppService.environment(),
      },
      transports: [
        new winston.transports.Console({
          format,
        }),
      ],
    };
  }

  static typeORMConfig(): TypeOrmModuleOptions {
    const {
      DB_HOST,
      DB_PORT,
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      DB_LOGGING,
      DB_SYNC,
    } = process.env;

    return {
      type: 'mysql',
      host: DB_HOST || 'localhost',
      port: DB_PORT ? Number(DB_PORT) : 3306,
      username: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DB_NAME || 'eventmax',
      entities: [
        __dirname + '/infrastructure/database/entities/*.entity{.ts,.js}',
      ],
      logging: DB_LOGGING ? JSON.parse(DB_LOGGING) : false,
      synchronize: DB_SYNC ? JSON.parse(DB_SYNC) : false,
    };
  }
}
