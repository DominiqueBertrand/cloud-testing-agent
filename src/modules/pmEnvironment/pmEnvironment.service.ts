import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmEnvironment } from '@src/entities';
import { ElementsQueryDto } from './dto';

@Injectable()
export class PmEnvironmentService {
  constructor(
    @InjectRepository(PmEnvironment) private readonly pmEnvironmentRepository: EntityRepository<PmEnvironment>,
    // private readonly pmEnvironmentRepository: PmEnvironmentRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll({ limit, offset, orderBy: orderbyKey }: ElementsQueryDto): Promise<PmEnvironment[]> {
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
    return this.pmEnvironmentRepository.findAll({
      //   populate: ['environment', 'report'],
      orderBy,
      limit: limit ?? 20,
      offset: offset ?? 0,
      fields: ['id', 'ref', 'name', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(environmentId: string): Promise<PmEnvironment | null> {
    const environment: PmEnvironment | null = await this.pmEnvironmentRepository.findOne({ id: environmentId });
    return environment;
  }

  async create({ environment, ref, id }) {
    try {
      const name = environment?.name;
      const pmEnvironment: PmEnvironment = new PmEnvironment(environment, id, ref, name);
      this.em.persist(pmEnvironment);
      await this.em.flush();

      return { pmEnvironment };
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ environment, ref, id }) {
    try {
      const _environment: PmEnvironment | null = await this.pmEnvironmentRepository.findOne({ ref: id });
      if (!_environment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      }
      if (!environment?.id !== id) {
        throw new HttpException('Environment id mistmatch', HttpStatus.NOT_FOUND);
      }
      const name = environment?.name;
      const pmEnvironment: PmEnvironment = new PmEnvironment(environment, id, ref, name);
      this.em.persist(pmEnvironment);
      await this.em.flush();

      return { pmEnvironment };
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      // using reference is enough, no need for a fully initialized entity
      const environment = await this.pmEnvironmentRepository.findOne({ ref: id });

      if (!environment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(environment);
      }
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }
}
