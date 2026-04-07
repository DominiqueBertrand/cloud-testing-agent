import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Task } from '@src/entities';
import { CreateOrUpdateElementDto, FindAllElementsQueryDto } from './dto';

import { TaskService } from './task.service';
import { RunBatch } from './dto/run-batch';
import { UpdateReportDto } from './dto/update-report';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { IRunningSchedule, ITask } from './task.type';
import { Public } from '../common/decorators';
import { InternalOrJwtAuthGuard } from '../common/guards';

@Controller('task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({
    summary: 'List tasks',
    description: 'List existing tasks with their linked collection/environment and statuses.',
  })
  @ApiQuery({
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
    name: 'limit',
    required: false,
    type: Number,
  })
  async find(@Query() query: FindAllElementsQueryDto): Promise<Task[]> {
    return await this.taskService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by id',
    description: 'Fetch a single task with collection and environment references.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a task',
    description:
      'Create a task that binds a Postman collection to an environment. Use the returned task id to run tests.',
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'The task has been successfully created.',
    type: Task,
  })
  async create(@Body() body: CreateOrUpdateElementDto): Promise<ITask> {
    if (!body.collection) {
      throw new HttpException('{collection} object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.environment) {
      throw new HttpException('{environmemt} object is missing', HttpStatus.BAD_REQUEST);
    }

    return this.taskService.create(body);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Update collection/environment references or task status.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async update(@Param('id') id: string, @Body() body: CreateOrUpdateElementDto): Promise<ITask> {
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

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }

  @Public()
  @UseGuards(InternalOrJwtAuthGuard)
  @Post(':id/actions/report')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a task report' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async updateReport(@Param('id') id: string, @Body() body: UpdateReportDto): Promise<ITask> {
    if (!body.status && !body.testStatus) {
      throw new HttpException('At least {status} or {testStatus} should be defined', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.updateReport(id, { status: body.status, testStatus: body.testStatus, report: body.report });
  }

  @Post(':id/actions/run')
  @ApiOperation({
    summary: 'Run a task once',
    description: 'Trigger a one-shot execution of the task. Returns the task metadata immediately.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the task',
  })
  async createTest(@Param('id') id: string): Promise<ITask> {
    if (!id) {
      throw new HttpException('A task Id should be put as argument', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.run(id);
  }

  @Post('actions/run/batch')
  @ApiOperation({
    summary: 'Run a batch of tasks',
    description: 'Trigger execution for multiple task ids. Useful for bulk re-runs.',
  })
  async createTestBatch(@Body() body: RunBatch): Promise<Array<object>> {
    if (!body.tasks) {
      throw new HttpException('A batch of task Id should be put as argument', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.runBatch(body.tasks);
  }

  @Post(':id/actions/run/schedule')
  @ApiOperation({
    summary: 'Start a schedule',
    description:
      'Start a cron schedule by schedule id (not task id). The job runs in memory and is listed in GET /task/actions/run/schedule.',
  })
  async createScheduledTask(@Param('id') id: string): Promise<void> {
    if (!id) {
      throw new HttpException('A schedule Id should be put as argument', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.runSchedule(id);
  }

  @Get('actions/run/schedule')
  @ApiOperation({
    summary: 'List running schedules',
    description: 'List schedules currently running in memory (not persisted after restart).',
  })
  async getSchedules(): Promise<IRunningSchedule[]> {
    return this.taskService.getRunningSchedules();
  }

  @Delete(':id/actions/run/schedule')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  @ApiOperation({
    summary: 'Stop a running schedule',
    description: 'Stop a running cron job by schedule id.',
  })
  async stopScheduleTask(@Param('id') id: string): Promise<void> {
    if (!id) {
      throw new HttpException('A schedule Id should be put as argument', HttpStatus.BAD_REQUEST);
    }
    return this.taskService.stopSchedule(id);
  }
}
