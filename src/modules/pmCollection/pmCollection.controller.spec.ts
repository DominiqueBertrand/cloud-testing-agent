import { Test, TestingModule } from '@nestjs/testing';
import { PmCollectionController } from './pmCollection.controller';
import { PmCollectionService } from './pmCollection.service';
import { CreateOrUpdateCollectionDto, ElementsQueryDto } from './dto';

describe('PmCollectionController', () => {
  let moduleRef: TestingModule;
  let pmCollectionController: PmCollectionController;
  // let pmCollectionService: PmCollectionService;
  let collectionId: string;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmCollectionController],
      providers: [
        {
          provide: PmCollectionService,
          useValue: {
            create: jest.fn().mockImplementation((query: ElementsQueryDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(''),
            update: jest.fn().mockResolvedValue(CreateOrUpdateCollectionDto),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    pmCollectionController = moduleRef.get<PmCollectionController>(PmCollectionController);
    // pmCollectionService = moduleRef.get<PmCollectionService>(PmCollectionService);
  });

  it('should be defined', () => {
    expect(pmCollectionController).toBeDefined();
  });
  describe('find', () => {
    it('should return an array"', async () => {
      const test = await pmCollectionController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });

      // jest.spyOn(pmCollectionService, 'findAll').mockImplementation(() => test);

      expect(Array.isArray(test)).toBe(true);
    });
  });
  describe('create', () => {
    it('should return an array"', async () => {
      const mock: CreateOrUpdateCollectionDto = {
        ref: '',
        collection: {
          info: {
            _postman_id: 'f919110f-0000-0000-0000-d291b47527b5',
            name: 'TEST',
            schema: 'https://schema.com/collection.json',
            _exporter_id: '00000000',
          },
          event: [
            {
              listen: 'prerequest',
              script: {
                type: 'text/javascript',
                exec: [''],
              },
            },
            {
              listen: 'test',
              script: {
                type: 'text/javascript',
                exec: [''],
              },
            },
          ],
          variable: [
            {
              key: 'variable',
              value: 'value',
              type: 'string',
            },
          ],
        },
      };
      const test = await pmCollectionController.create(mock);
      expect(test).not.toEqual(null);

      if (test) {
        collectionId = test.id;
      }
    });
  });
  describe('findOne', () => {
    it('should return an environment"', async () => {
      const test = await pmCollectionController.findOne(collectionId);
      expect(test).not.toEqual(null);
    });
  });
  describe('update', () => {
    it('should return an environment"', async () => {
      const mock: CreateOrUpdateCollectionDto = {
        collection: {
          info: {
            _postman_id: 'f119340f-0000-0000-0000-d291b47527b5',
            name: 'TEST UPDATE',
            schema: 'https://schema.com/collection.json',
            _exporter_id: '00000000',
          },
          event: [
            {
              listen: 'prerequest',
              script: {
                type: 'text/javascript',
                exec: [''],
              },
            },
            {
              listen: 'test',
              script: {
                type: 'text/javascript',
                exec: [''],
              },
            },
          ],
          variable: [
            {
              key: 'variable',
              value: 'value',
              type: 'string',
            },
          ],
        },
        ref: '',
      };
      const test = await pmCollectionController.update(collectionId, mock);
      expect(test).not.toEqual(null);
    });
  });

  describe('delete', () => {
    it('should return an message"', async () => {
      const test = await pmCollectionController.delete(collectionId);
      expect(test).not.toEqual(null);
      expect(test).toContain(collectionId);
    });
  });
});
