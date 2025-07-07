import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '~modules/auth/auth.module';
import { ProfilesModule } from '~modules/profiles/profiles.module';
import { SharedModule } from '~shared/shared.module';
import { CoreModule } from '~core/core.module';

@Module({
  imports: [CoreModule, SharedModule, AuthModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
