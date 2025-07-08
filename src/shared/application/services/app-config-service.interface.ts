import { ConfigService } from '@nestjs/config';

import { AppConfigModel } from '~shared/application/models/app-config.model';

export type IAppConfigService = ConfigService<AppConfigModel, true>;
