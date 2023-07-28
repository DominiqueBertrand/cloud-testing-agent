import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Task, PmReport, PmCollection, PmEnvironment, User, RefreshSession } from './entities';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Task, PmReport, PmCollection, PmEnvironment, User, RefreshSession],
  dbName: 'coog-cloud-agent.sqlite.db',
  type: 'sqlite',
  port: 3307,
  debug: true,
  logger: logger.log.bind(logger),
  // for highlighting the SQL queries
  highlighter: new SqlHighlighter(),
};

export default config;
