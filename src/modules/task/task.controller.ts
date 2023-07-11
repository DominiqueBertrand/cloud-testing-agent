import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder } from '@mikro-orm/core';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InjectRepository } from '@mikro-orm/nestjs';
import { Task } from '../../entities';
import { CreateOrUpdateElementDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: EntityRepository<Task>,
    private readonly taskService: TaskService,
  ) {}

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
  async create(@Body() body: CreateOrUpdateElementDto) {
    if (!body.collection) {
      throw new HttpException('{collection} object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.environment) {
      throw new HttpException('{environmemt} object is missing', HttpStatus.BAD_REQUEST);
    }

    return this.taskService.create({
      collection: body.collection,
      environment: body.environment,
      ref: body.ref,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  async update(@Param() id: string, @Body() body: CreateOrUpdateElementDto) {
    if (!body.collection && !body.environment) {
      throw new HttpException('At least {collection} or {environment} should be defined', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.update(id, {
      collection: body.collection,
      environment: body.environment,
    });
  }
}
