import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RefreshDto, LoginDto, LoginResponseDto } from './dto';
import { LocalAuthGuard } from './local/local-auth.guard';
import { User } from '../common/decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({
    status: 200,
    description: 'The task has been successfully created.',
    type: LoginResponseDto,
  })
  async login(@Body() @User() user: LoginDto): Promise<any> {
    return await this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refreshToken(refreshDto.refreshToken);
  }
}
