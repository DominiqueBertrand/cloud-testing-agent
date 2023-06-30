import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import serviceConfig from './service.config';

describe('sendgridConfig', () => {
  let config: ConfigType<typeof serviceConfig>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(serviceConfig)],
    }).compile();

    config = module.get<ConfigType<typeof serviceConfig>>(serviceConfig.KEY);
  });

  it('should be defined', () => {
    expect(serviceConfig).toBeDefined();
  });

  it('should contains expiresIn and secret key', async () => {
    expect(config.port).toBeTruthy();
  });
});
