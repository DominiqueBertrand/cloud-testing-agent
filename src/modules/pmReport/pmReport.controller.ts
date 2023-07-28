import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PmReportService } from './pmReport.service';
import { PmReport } from '@src/entities';
import { ElementsQueryDto, CreateOrUpdateReportDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Public } from '../common/decorators';
@UseGuards(JwtAuthGuard)
@Controller('report')
@ApiBearerAuth()
@ApiTags('Report')
export class PmReportController {
  constructor(private readonly pmReportService: PmReportService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get a list of all reports' })
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
  async find(@Query() query: ElementsQueryDto): Promise<PmReport[]> {
    return await this.pmReportService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a report by id' })
  async findOne(@Param('id') id: string) {
    return await this.pmReportService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiCreatedResponse({
    status: 200,
    description: 'The environment has been successfully created.',
    type: PmReport,
  })
  async create(@Body() body: CreateOrUpdateReportDto) {
    if (!body.report) {
      throw new HttpException('"report" object is missing', HttpStatus.BAD_REQUEST);
    }

    return await this.pmReportService.create({ report: body.report, status: body?.status });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing report' })
  async update(@Param() id: string, @Body() body: CreateOrUpdateReportDto) {
    if (!body.report) {
      throw new HttpException('"report" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.status) {
      throw new HttpException('"status" is missing', HttpStatus.BAD_REQUEST);
    }

    return await this.pmReportService.update({ report: body.report, status: body.status, id });
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  async delete(@Param('id') id: string) {
    return this.pmReportService.delete(id);
  }
}
