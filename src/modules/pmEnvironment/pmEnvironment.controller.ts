import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PmEnvironmentService } from './pmEnvironment.service';
import { ElementsQueryDto, CreateOrUpdateEnvironmentDto } from './dto';
import { PmEnvironment } from '@src/entities';

@Controller('postman/environment')
@ApiTags('Postman/Environment')
export class PmEnvironmentController {
  constructor(private readonly pmEnvironmentService: PmEnvironmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all environments' })
  @ApiQuery({
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
    name: 'limit',
    required: false,
    type: Number,
  })
  async find(@Query() query: ElementsQueryDto) {
    return this.pmEnvironmentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a environment by the id' })
  async findOne(@Param('id') id: string) {
    return this.pmEnvironmentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new environment' })
  @ApiCreatedResponse({
    status: 200,
    description: 'The environment has been successfully created.',
    type: PmEnvironment,
  })
  async create(@Body() body: CreateOrUpdateEnvironmentDto) {
    if (!body.environment) {
      throw new HttpException('"environment" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.environment?.info?._postman_id || !body.environment?.info?.name) {
      throw new HttpException('"environment" object is in wrong format', HttpStatus.BAD_REQUEST);
    }

    const id = body.environment?.info?._postman_id;
    const ref = body.ref ?? id;

    return this.pmEnvironmentService.create({ environment: body.environment, ref, id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a environment' })
  async update(@Param() id: string, @Body() body: CreateOrUpdateEnvironmentDto) {
    if (!body.environment) {
      throw new HttpException('"environment" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.environment?.info?._postman_id || !body.environment?.info?.name) {
      throw new HttpException('"environment" object is in wrong format', HttpStatus.BAD_REQUEST);
    }
    const ref = body.ref;

    return this.pmEnvironmentService.create({ environment: body.environment, ref, id });
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  async delete(@Param('id') id: string) {
    return this.pmEnvironmentService.delete(id);
  }
}
