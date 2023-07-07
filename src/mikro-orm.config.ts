import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { Task, PmReport, PmCollection, PmEnvironment } from './entities';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Task, PmReport, PmCollection, PmEnvironment],
  dbName: 'coog-cloud-agent.sqlite.db',
  type: 'sqlite',
  port: 3307,
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
