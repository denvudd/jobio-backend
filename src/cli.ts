#!/usr/bin/env node

import { RunSeedsCommand } from './shared/infrastructure/seeds/cli/run-seeds.command';

async function bootstrap() {
  await RunSeedsCommand.run();
}

bootstrap().catch((error) => {
  console.error('Failed to run CLI command:', error);
  process.exit(1);
}); 