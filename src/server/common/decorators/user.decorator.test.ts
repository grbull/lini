/* eslint-disable init-declarations */
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

import { userDecoratorFactory } from './user.decorator';

describe('UserDecorator', () => {
  it('should return user', () => {
    const user = { id: 0 };
    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({
      user,
    });

    expect(userDecoratorFactory(null, context)).toBe(user);
  });

  it('should return undefined', () => {
    const user = undefined;
    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({
      user,
    });

    expect(userDecoratorFactory(null, context)).toBeUndefined();
  });
});
