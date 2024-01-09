import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Task, PmReport, PmCollection, PmEnvironment, User, RefreshSession, PmSchedule } from './entities';

import { dbPath, dbPort } from '@src/config/service.config';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Task, PmReport, PmCollection, PmEnvironment, User, RefreshSession, PmSchedule],
  dbName: dbPath,
  type: 'sqlite',
  port: dbPort,
  debug: true,
  logger: logger.log.bind(logger),
  // for highlighting the SQL queries
  highlighter: new SqlHighlighter(),
  seeder: {
    path: './modules/orm/seeders', // path to the folder with migrations
    pathTs: './src/modules/orm/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;
