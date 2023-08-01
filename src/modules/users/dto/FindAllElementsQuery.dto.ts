import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class FindAllElementsQueryDto {
  @IsInt()
  @ApiProperty({
    required: false,
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
  })
  readonly limit!: number;

  @IsInt()
  @ApiProperty({
    required: false,
    description:
      'By default, the number of results is limited to 20, so set this value if you want to change this limit',
  })
  readonly offset!: number;

  @IsString()
  @ApiProperty({
    required: false,
    description:
      'By default, the results are sorted by the date of modification (updatedAt), so set this value if you want to change this key (createdAt or id)',
  })
  readonly orderBy!: string;
}
