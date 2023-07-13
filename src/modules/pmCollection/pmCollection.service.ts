import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmCollection } from '@src/entities';
import { ElementsQueryDto } from './dto';

@Injectable()
export class PmCollectionService {
  constructor(
    @InjectRepository(PmCollection) private readonly pmCollectionRepository: EntityRepository<PmCollection>,
    private readonly em: EntityManager,
  ) {}

  async findAll({ limit, offset, orderBy: orderbyKey }: ElementsQueryDto): Promise<PmCollection[]> {
    let orderBy: any;

    switch (orderbyKey) {
      case 'updatedAt': {
        orderBy = { updatedAt: QueryOrder.DESC };
        break;
      }
      case 'createdAt': {
        orderBy = { createdAt: QueryOrder.DESC };
        break;
      }
      case 'id': {
        orderBy = { id: QueryOrder.DESC };
        break;
      }

      default: {
        orderBy = { updatedAt: QueryOrder.DESC };
        break;
      }
    }
    return this.pmCollectionRepository.findAll({
      //   populate: ['collection', 'report'],
      orderBy,
      limit: limit ?? 20,
      offset: offset ?? 0,
      fields: ['id', 'ref', 'name', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(collectionId: string): Promise<PmCollection | null> {
    const collection: PmCollection | null = await this.pmCollectionRepository.findOne({ id: collectionId });
    return collection;
  }

  async create({ collection, ref, id }) {
    try {
      const name = collection?.info?.name;
      const pmCollection: PmCollection = new PmCollection(collection, id, ref, name);
      this.em.persist(pmCollection);
      await this.em.flush();

      return { pmCollection };
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ collection, ref, id }) {
    try {
      const _collection: PmCollection | null = await this.pmCollectionRepository.findOne({ ref: id });
      if (!_collection) {
        throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
      }
      if (!collection?.id !== id) {
        throw new HttpException('Collection id mistmatch', HttpStatus.NOT_FOUND);
      }
      const name = collection?.name;
      const pmCollection: PmCollection = new PmCollection(collection, id, ref, name);
      this.em.persist(pmCollection);
      await this.em.flush();

      return { pmCollection };
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      // using reference is enough, no need for a fully initialized entity
      const collection = await this.pmCollectionRepository.findOne({ ref: id });

      if (!collection) {
        throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(collection);
      }
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }
}
