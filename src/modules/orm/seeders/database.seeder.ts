import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Logger } from '@nestjs/common';
import chalk from 'chalk';

import { AdminSeeder } from './admin.seeder';
import { UserSeeder } from './user.seeder';

/*
 * It calls the AdminSeeder and UserSeeder classes
 */
export class DatabaseSeeder extends Seeder {
  public logger = new Logger('DatabaseSeeder');

  async run(em: EntityManager): Promise<void> {
    const seeders = [AdminSeeder, UserSeeder];

    this.logger.log(`Seeding database with seeders: ${chalk.green(seeders.map(s => s.name).join(', '))}`);

    return this.call(em, seeders);
  }
}
