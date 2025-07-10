import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';

import { AppService } from 'src/app.service';

@ApiTags('Health')
@PublicRoute()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): { status: string; timestamp: string } {
    return this.appService.health();
  }
}
