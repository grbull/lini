/* eslint-disable init-declarations */
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true with user', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      user: {
        id: 0,
      },
    });

    expect(guard.canActivate(context)).toBeTruthy();
    // Called twice for some reason.
    expect(context.switchToHttp).toBeCalledTimes(2);
  });

  it('should return false without user', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      user: null,
    });

    expect(guard.canActivate(context)).toBeFalsy();
    // Called twice for some reason.
    expect(context.switchToHttp).toBeCalledTimes(2);
  });
});
