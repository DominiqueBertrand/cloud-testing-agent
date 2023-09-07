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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PmCollectionService } from './pmCollection.service';
import { ElementsQueryDto, CreateOrUpdateCollectionDto } from './dto';
import { PmCollection } from '@src/entities';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('postman/collection')
@ApiBearerAuth()
@ApiTags('Postman/Collection')
export class PmCollectionController {
  constructor(private readonly pmCollectionService: PmCollectionService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all collections' })
  @ApiQuery({
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
    name: 'limit',
    required: false,
    type: Number,
  })
  async find(@Query() query: ElementsQueryDto): Promise<PmCollection[]> {
    return this.pmCollectionService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a collection by the id' })
  async findOne(@Param('id') id: string): Promise<PmCollection | null> {
    return this.pmCollectionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiCreatedResponse({
    status: 200,
    description: 'The collection has been successfully created.',
    type: PmCollection,
  })
  async create(@Body() body: CreateOrUpdateCollectionDto): Promise<PmCollection> {
    if (!body.collection) {
      throw new HttpException('"collection" object is missing', HttpStatus.BAD_REQUEST);
    }
    if (!body.collection?.info?._postman_id || !body.collection?.info?.name) {
      throw new HttpException('"collection" object is in wrong format', HttpStatus.BAD_REQUEST);
    }

    const id = body.collection?.info?._postman_id;
    const ref = body.ref ?? id;

    return this.pmCollectionService.create({ collection: body.collection, ref, id });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.pmCollectionService.delete(id);
  }
}
