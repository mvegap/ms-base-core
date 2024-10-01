require('newrelic');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // newrelic.start();
  // app.use(newrelic);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.APP_PREFIX || 'api/v1');
  app.useLogger(logger);
  app.enableCors({
    origin: process.env.APP_CORS_ORIGIN,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'NestJS')
    .setDescription(process.env.APP_DESCRIPTION)
    .setContact(
      process.env.APP_CONTACT,
      process.env.APP_LINK_WEB,
      process.env.APP_EMAIL,
    )
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    process.env.SWAGGER_DOCS_PATH || 'docs/swagger',
    app,
    document,
    {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
      },
    },
  );

  await app.listen(AppService.port(), '0.0.0.0');
  logger.log(`Runing on port ==> ${AppService.port()}`, 'main.bootstrap');
}

bootstrap();
