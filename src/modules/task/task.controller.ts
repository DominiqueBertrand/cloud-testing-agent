import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { InjectRepository } from '@mikro-orm/nestjs';
import { Task } from '../../entities';
import { CreateOrUpdateElementDto, FindAllElementsQueryDto } from './dto';
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
  @ApiQuery({
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
    name: 'limit',
    required: false,
    type: Number,
  })
  async find(@Query() query: FindAllElementsQueryDto) {
    return await this.taskService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  async findOne(@Param() id: string) {
    return await this.taskRepository.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({
    status: 200,
    description: 'The task has been successfully created.',
    type: Task,
  })
  async create(@Body() body: CreateOrUpdateElementDto): Promise<Task> {
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
  async update(@Param() id: string, @Body() body: CreateOrUpdateElementDto): Promise<Task> {
    if (!body.collection && !body.environment) {
      throw new HttpException('At least {collection} or {environment} should be defined', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.update(id, {
      collection: body.collection,
      environment: body.environment,
    });
  }
}
