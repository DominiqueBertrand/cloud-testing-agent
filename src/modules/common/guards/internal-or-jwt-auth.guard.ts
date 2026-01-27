import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalOrJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headerToken = request?.headers?.['x-internal-token'];
    const internalToken = Array.isArray(headerToken) ? headerToken[0] : headerToken;
    const expectedToken = this.configService.get<string>('service.internalToken');

    if (expectedToken && internalToken === expectedToken) {
      return true;
    }

    return super.canActivate(context);
  }
}
