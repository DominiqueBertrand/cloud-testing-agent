import { InternalOrJwtAuthGuard } from './internal-or-jwt-auth.guard';

describe('InternalOrJwtAuthGuard', () => {
  it('should allow request when internal token matches', () => {
    const configService = {
      get: jest.fn().mockReturnValue('test-token'),
    };
    const guard = new InternalOrJwtAuthGuard(configService as any);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-internal-token': 'test-token',
          },
        }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });
});
