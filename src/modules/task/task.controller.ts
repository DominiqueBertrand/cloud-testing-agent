import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InjectRepository } from '@mikro-orm/nestjs';
import { Task } from '../../entities';

@Controller('task')
@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(@InjectRepository(Task) private readonly taskRepository: EntityRepository<Task>) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all tasks' })
  async find() {
    return await this.taskRepository.findAll({
      //   populate: ['collection', 'report'],
      orderBy: { updatedAt: QueryOrder.DESC },
      limit: 20,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  async findOne(@Param() id: string) {
    return await this.taskRepository.findOneOrFail(id, {
      populate: ['collection', 'report'],
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  async create(@Body() body: Task) {
    if (!body.collection) {
      throw new HttpException('{collection} object is missing', HttpStatus.BAD_REQUEST);
    }

    const task = this.taskRepository.create(body);
    wrap(task.collection, true).__initialized = true;
    await this.taskRepository.persist(task).flush();

    return task;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  async update(@Param() id: string, @Body() body: any) {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    wrap(task).assign(body);
    await this.taskRepository.persist(task);

    return task;
  }
}
