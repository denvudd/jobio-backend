import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from 'src/app.service';

@ApiTags('Ping')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return this.appService.ping();
  }

  @Get('health')
  health(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
