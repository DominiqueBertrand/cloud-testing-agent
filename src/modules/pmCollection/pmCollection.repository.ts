import { EntityRepository } from '@mikro-orm/mysql';
import { PmCollection } from '@src/entities';

export class PmCollectionRepository extends EntityRepository<PmCollection> {}
