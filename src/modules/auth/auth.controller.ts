import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RefreshDto, LoginDto, LoginResponseDto } from './dto';
import { LocalAuthGuard } from './local/local-auth.guard';
import { User as UserDecorators, GetCurrentUserId } from '../common/decorators';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { User } from '@src/entities';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({
    status: 200,
    description: 'Get JWT Token to login.',
    type: LoginResponseDto,
  })
  async login(@Body() @UserDecorators() user: LoginDto): Promise<any> {
    return await this.authService.login(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT Token' })
  @ApiCreatedResponse({
    status: 200,
    description: 'Returns a JWT Token and a Refresh Token',
    type: LoginResponseDto,
  })
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refreshToken(refreshDto.refreshToken);
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async profile(@GetCurrentUserId() userId: string): Promise<User> {
    return await this.authService.profile(userId);
  }

  @Post('profile/actions/update')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@GetCurrentUserId() userId: string, @Body() updateProfileDto: UpdateProfileDto): Promise<User> {
    return await this.authService.updateProfile(userId, updateProfileDto);
  }
}
