import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PmScheduleService } from './pmSchedule.service';
import { PmSchedule } from '@src/entities';
import { ElementsQueryDto, CreateOrUpdateScheduletDto } from './dto';

@Controller('schedule')
@ApiBearerAuth()
@ApiTags('Schedule')
export class PmScheduleController {
  constructor(private readonly pmSqueduleService: PmScheduleService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all schedules' })
  @ApiQuery({
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    description: 'The default value of the offset is 0, so set this value if you want to change the offeset',
    name: 'offset',
    required: false,
    type: Number,
  })
  async find(@Query() query: ElementsQueryDto): Promise<PmSchedule[]> {
    return await this.pmSqueduleService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a schedule by id' })
  async findOne(@Param('id') id: string) {
    return await this.pmSqueduleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiCreatedResponse({
    status: 200,
    description: 'The schedule has been successfully created.',
    type: PmSchedule,
  })
  async create(@Body() body: CreateOrUpdateScheduletDto) {
    if (!body.schedule) {
      throw new HttpException('"schedule" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.taskId) {
      throw new HttpException('"id" object is missing', HttpStatus.BAD_REQUEST);
    }
    return await this.pmSqueduleService.create({ pSchedule: body.schedule, id: body.taskId });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing schedule' })
  async update(@Param() id: string, @Body() body: CreateOrUpdateScheduletDto) {
    if (!body.schedule) {
      throw new HttpException('"schedule" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (id) {
      throw new HttpException('"task id" is missing', HttpStatus.BAD_REQUEST);
    }

    return await this.pmSqueduleService.update({ schedule: body.schedule, id });
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The schedule has been successfully deleted.' })
  async delete(@Param('id') id: string) {
    return this.pmSqueduleService.delete(id);
  }
}
