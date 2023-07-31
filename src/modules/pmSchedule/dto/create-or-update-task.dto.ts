import { ApiProperty } from '@nestjs/swagger';
// import { Task } from '@src/entities';
import { IPmSchedule, ISchedule } from '@src/modules/pmSchedule/pmSchedule.type';

export class CreateOrUpdateScheduletDto implements Partial<IPmSchedule> {
  @ApiProperty({
    required: true,
    description: 'Postman report in json format',
  })
  readonly schedule!: ISchedule;
}
