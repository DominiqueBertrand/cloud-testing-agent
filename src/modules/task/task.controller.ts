import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Task } from '@src/entities';
import { CreateOrUpdateElementDto, FindAllElementsQueryDto } from './dto';

import { TaskService } from './task.service';
import { RunBatch } from './dto/run-batch';
import { UpdateReportDto } from './dto/update-report';

@Controller('task')
@ApiBearerAuth()
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async findOne(@Param() id: string) {
    return await this.taskService.findOne(id);
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async update(@Param() id: string, @Body() body: CreateOrUpdateElementDto): Promise<Task> {
    if (!body.collection && !body.environment) {
      throw new HttpException('At least {collection} or {environment} should be defined', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.update(id, {
      collection: body.collection,
      environment: body.environment,
      status: body.status,
      testStatus: body.testStatus,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/actions/report')
  @ApiOperation({ summary: 'Update a task report' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async updateReport(@Param() id: string, @Body() body: UpdateReportDto): Promise<Task> {
    if (!body.status && !body.testStatus) {
      throw new HttpException('At least {status} or {testStatus} should be defined', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.updateReport(id, { status: body.status, testStatus: body.testStatus, report: body.report });
  }

  @Post(':id/actions/run')
  @ApiOperation({ summary: 'Create a test for the task' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async createTest(@Param() id: string) {
    if (!id) {
      throw new HttpException('An task Id should be put as argument', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.run(id);
  }

  @Post('actions/run/batch')
  @ApiOperation({ summary: 'Create a batch of tests for the tasks' })
  async createTestBatch(@Body() body: RunBatch) {
    if (!body.tasks) {
      throw new HttpException('A batch of task Id should be put as argument', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.runBatch(body.tasks);
  }
}
