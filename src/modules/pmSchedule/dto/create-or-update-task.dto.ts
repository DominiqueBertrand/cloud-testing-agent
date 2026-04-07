import { ApiProperty } from '@nestjs/swagger';
import { IPmSchedule, Schedule } from '@src/modules/pmSchedule/pmSchedule.type';

export class CreateOrUpdateScheduletDto implements Partial<IPmSchedule> {
  @ApiProperty({
    required: true,
    description: 'Schedule payload: cron expression + human friendly name.',
    example: { cron: '*/5 * * * * *', name: 'run-every-5s' },
  })
  readonly schedule!: Schedule;

  @ApiProperty({
    required: true,
    description: 'Task id to attach to this schedule.',
    example: 'd66b2795-aadf-49d3-b1d0-fcc111c6c4c1',
  })
  readonly taskId!: string;
}
