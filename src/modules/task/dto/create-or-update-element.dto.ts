import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmCollection } from '@src/modules/pmCollection/pmCollection.type';
import { IEnvironment, IPmEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { TaskStatus, TaskType } from '../task-status.enum';

interface IDtoCollection extends Partial<IPmCollection> {
  id: string;
  environment?: IEnvironment;
}

interface IDtoEnvironment extends Partial<IPmEnvironment> {
  id: string;
}

export class CreateOrUpdateElementDto {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Optional reference label for the task.',
    example: 'migration-tnr-run',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Reference to an existing Postman collection.',
    example: { id: '3ede584c-ef4b-4634-b8c6-a4cd980394f6' },
  })
  readonly collection!: IDtoCollection;

  @ApiProperty({
    required: true,
    description: 'Reference to an existing Postman environment.',
    example: { id: '3f68fe37-e2b2-47b3-9530-02452adb9ae4' },
  })
  readonly environment!: IDtoEnvironment;

  @ApiProperty({
    required: false,
    description: 'Task lifecycle status.',
    example: 'OPEN',
  })
  readonly status?: TaskStatus;

  @ApiProperty({
    required: false,
    description: 'Execution mode for the task.',
    example: 'ONESHOT',
  })
  readonly type?: TaskType;

  @ApiProperty({
    required: false,
    description: 'Latest test status for the task.',
    example: 'PENDING',
  })
  readonly testStatus?: TestStatus;
}
