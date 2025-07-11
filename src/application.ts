import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { writeFileSync } from 'fs';

import { FlagParser } from '~lib/flag-parser';

import { AppModule } from 'src/app.module';

export class Application {
  private readonly port: string | number;
  private readonly nodeArguments: Map<string, string>;
  private readonly nodeEnv: string;
  protected app: NestApplication;

  constructor() {
    this.port = process.env.DD_PORT || 8080;
    this.nodeEnv = process.env.NODE_ENV;
    this.nodeArguments = FlagParser.getFlags(process.argv);
  }
  public async init() {
    this.app = await NestFactory.create(AppModule, {
      bodyParser: true,
    });
    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
    this.appHeaders();
    await this.initSwaggerDoc();
    await this.app.listen(this.port);
  }

  private appHeaders() {
    this.app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  }

  private async initSwaggerDoc() {
    const config = new DocumentBuilder()
      .setTitle('Jobio API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);

    if (this.nodeArguments.has('api-client-and-exit')) {
      writeFileSync('./api.json', JSON.stringify(document));
      await Promise.race([this.app.close(), new Promise((resolve) => setTimeout(resolve, 10000))]);
      process.exit(0);
    }
  }
}
