import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmEnvironment } from '@src/entities';
import { ElementsQueryDto } from './dto';

@Injectable()
export class PmEnvironmentService {
  constructor(private readonly em: EntityManager) {}

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
    return this.em.find(
      PmEnvironment,
      {},
      {
        orderBy,
        limit: limit ?? 20,
        offset: offset ?? 0,
        fields: ['id', 'ref', 'name', 'createdAt', 'updatedAt', 'tasks'],
      },
    );
  }

  async findOne(environmentId: string): Promise<PmEnvironment> {
    const environment: PmEnvironment | null = await this.em.findOne(
      PmEnvironment,
      { id: environmentId },
      {
        fields: ['id', 'ref', 'name', 'createdAt', 'updatedAt', 'tasks'],
      },
    );
    if (!environment) throw new HttpException(`Error 404: Environment not found`, HttpStatus.NOT_FOUND);

    return environment;
  }

  async create({ environment, ref, id }): Promise<PmEnvironment> {
    try {
      const name: string = environment?.name;
      const pmEnvironment: PmEnvironment = new PmEnvironment(environment, id, ref, name);
      this.em.persist(pmEnvironment);
      await this.em.flush();

      return pmEnvironment;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ environment, id }): Promise<PmEnvironment> {
    try {
      const pmEnvironment: PmEnvironment | null = await this.em.findOneOrFail(
        PmEnvironment,
        { id },
        { populate: true },
      );
      if (!pmEnvironment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      }
      if (!environment?.id === id) {
        throw new HttpException('Environment id mistmatch', HttpStatus.NOT_FOUND);
      }
      this.em.assign(
        pmEnvironment,
        { environment: JSON.stringify(environment), name: environment.name },
        { mergeObjects: true, convertCustomTypes: true },
      );
      await this.em.flush();

      return pmEnvironment;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // using reference is enough, no need for a fully initialized entity
      const environment: PmEnvironment | null = await this.em.findOne(PmEnvironment, { id });

      if (!environment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(environment);
      }
    } catch (error: any) {
      switch (error?.errno ?? error?.status) {
        case 19:
          throw new HttpException(
            `Error ${error.errno}: this environment is used by at least one task.`,
            HttpStatus.FAILED_DEPENDENCY,
          );
        case 404:
          throw new HttpException(`Error ${error.status}: ${error?.message}`, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST);
      }
    }
  }
}
