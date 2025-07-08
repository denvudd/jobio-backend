/* eslint-disable no-restricted-imports */
import { Module } from '@nestjs/common';

import { CoreModule } from '~core/core.module';

import { AuthModule } from '~modules/auth/auth.module';
import { ProfilesModule } from '~modules/profiles/profiles.module';

import { SharedModule } from '~shared/shared.module';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [CoreModule, SharedModule, AuthModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
