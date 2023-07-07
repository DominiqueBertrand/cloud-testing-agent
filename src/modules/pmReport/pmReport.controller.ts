import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InjectRepository } from '@mikro-orm/nestjs';
import { PmReport } from '../../entities';

@Controller('report')
@ApiTags('Report')
@Controller('report')
export class PmReportController {
  constructor(@InjectRepository(PmReport) private readonly reportRepository: EntityRepository<PmReport>) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all reports' })
  async find() {
    return await this.reportRepository.findAll({
      //   populate: ['collection', 'report'],
      orderBy: { updatedAt: QueryOrder.DESC },
      limit: 20,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a report by id' })
  async findOne(@Param() id: string) {
    return await this.reportRepository.findOneOrFail(id, {});
  }

  @Post()
  @ApiOperation({ summary: 'Create a report' })
  async create(@Body() body: PmReport) {
    if (!body.report) {
      throw new HttpException('{collection} object is missing', HttpStatus.BAD_REQUEST);
    }

    const report = this.reportRepository.create(body);
    wrap(report.report, true).__initialized = true;
    await this.reportRepository.persist(report).flush();

    return report;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a report' })
  async update(@Param() id: string, @Body() body: PmReport) {
    const report = await this.reportRepository.findOne(id);

    if (!report) {
      throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
    }

    wrap(report).assign(body);
    await this.reportRepository.persist(report);

    return report;
  }
}
