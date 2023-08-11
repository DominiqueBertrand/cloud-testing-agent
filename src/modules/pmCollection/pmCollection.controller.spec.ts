import { Test, TestingModule } from '@nestjs/testing';
import { PmCollectionController } from './pmCollection.controller';
import { PmCollectionService } from './pmCollection.service';
import { CreateOrUpdateCollectionDto } from './dto';

describe('PmCollectionController', () => {
  let moduleRef: TestingModule;
  let pmCollectionController: PmCollectionController;
  let collectionId: string;

  const mockCollection: CreateOrUpdateCollectionDto = {
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

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmCollectionController],
      providers: [
        {
          provide: PmCollectionService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((collection: CreateOrUpdateCollectionDto) => Promise.resolve({ ...collection })),
            findAll: jest.fn().mockResolvedValue([mockCollection]),
            findOne: jest.fn().mockResolvedValue(mockCollection),
            update: jest.fn().mockResolvedValue(CreateOrUpdateCollectionDto),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    pmCollectionController = moduleRef.get<PmCollectionController>(PmCollectionController);
  });

  it('should be defined', () => {
    expect(pmCollectionController).toBeDefined();
  });
  describe('find', () => {
    it('should return an array"', async () => {
      const test = await pmCollectionController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
      expect(test).toEqual(expect.objectContaining([mockCollection]));
      expect(200);
    });
  });
  describe('create', () => {
    it('should return an array"', async () => {
      const test = await pmCollectionController.create(mockCollection);
      expect(test).not.toEqual(null);
      expect(test).toEqual(expect.objectContaining(mockCollection));
      expect(200);
      if (test) {
        collectionId = test.id;
      }
    });
  });
  describe('findOne', () => {
    it('should return an environment"', async () => {
      const test = await pmCollectionController.findOne(collectionId);
      expect(test).not.toEqual(null);
      expect(test).toEqual(expect.objectContaining(mockCollection));
      expect(200);
    });
  });
  describe('update', () => {
    it('should return an environment"', async () => {
      const test = await pmCollectionController.update(collectionId, mockCollection);
      expect(test).not.toEqual(null);
      expect(test).toEqual(expect.objectContaining(mockCollection));
      expect(200);
    });
  });

  describe('delete', () => {
    it('should return an empty message"', async () => {
      const test = await pmCollectionController.delete(collectionId);
      expect(test).not.toEqual(null);
      expect(204);
    });
  });
});
