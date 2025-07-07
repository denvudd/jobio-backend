import { ConfigService } from '@nestjs/config';

import { AppConfigModel } from '../models/app-config.model';

export type IAppConfigService = ConfigService<AppConfigModel, true>;
