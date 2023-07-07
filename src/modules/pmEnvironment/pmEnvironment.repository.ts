import { EntityRepository } from '@mikro-orm/mysql';
import { PmEnvironment } from '@src/entities';

export class PmEnvironmentRepository extends EntityRepository<PmEnvironment> {}
