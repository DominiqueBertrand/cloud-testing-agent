import { IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
