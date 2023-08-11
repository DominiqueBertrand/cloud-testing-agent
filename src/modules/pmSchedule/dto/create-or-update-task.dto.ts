import { ApiProperty } from '@nestjs/swagger';
import { IPmSchedule, Schedule } from '@src/modules/pmSchedule/pmSchedule.type';

export class CreateOrUpdateScheduletDto implements Partial<IPmSchedule> {
  @ApiProperty({
    required: true,
    description: 'Postman schedule in json format',
  })
  readonly schedule!: Schedule;

  @ApiProperty({
    required: true,
    description: 'Postman schedule in json format',
  })
  readonly taskId!: string;
}
