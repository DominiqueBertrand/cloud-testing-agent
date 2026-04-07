import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PmEnvironmentService } from './pmEnvironment.service';
import { ElementsQueryDto, CreateOrUpdateEnvironmentDto } from './dto';
import { PmEnvironment } from '@src/entities';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('postman/environment')
@ApiBearerAuth()
@ApiTags('Postman/Environment')
export class PmEnvironmentController {
  constructor(private readonly pmEnvironmentService: PmEnvironmentService) {}

  @Get()
  @ApiOperation({
    summary: 'List environments',
    description: 'Use to list stored Postman environments. Useful to pick an environment id when creating tasks.',
  })
  @ApiQuery({
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
    name: 'limit',
    required: false,
    type: Number,
  })
  async find(@Query() query: ElementsQueryDto): Promise<PmEnvironment[]> {
    return await this.pmEnvironmentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an environment by id',
    description: 'Fetch a single environment metadata (id, name, ref).',
  })
  async findOne(@Param('id') id: string): Promise<PmEnvironment> {
    return await this.pmEnvironmentService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new environment',
    description:
      'Upload a Postman environment JSON (export). This environment can then be referenced by tasks via its id.',
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'The environment has been successfully created.',
    type: PmEnvironment,
  })
  async create(@Body() body: CreateOrUpdateEnvironmentDto): Promise<PmEnvironment> {
    if (!body.environment) {
      throw new HttpException('"environment" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.environment?.id || !body.environment?.name) {
      throw new HttpException('"environment" object is in wrong format', HttpStatus.BAD_REQUEST);
    }

    const id: string = body.environment?.id;
    const ref: string = body.ref ?? id;

    return await this.pmEnvironmentService.create({ environment: body.environment, ref, id });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an environment',
    description:
      'Replace the stored environment JSON for a given id. The environment.id in the payload must match the path id.',
  })
  async update(@Param('id') id: string, @Body() body: CreateOrUpdateEnvironmentDto): Promise<PmEnvironment> {
    if (!body.environment) {
      throw new HttpException('"environment" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.environment?.id || !body.environment?.name) {
      throw new HttpException('"environment" object is in wrong format', HttpStatus.BAD_REQUEST);
    }

    return await this.pmEnvironmentService.update({ environment: body.environment, id });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.pmEnvironmentService.delete(id);
  }
}
