import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const userDecoratorFactory = (
  _data: unknown,
  context: ExecutionContext
): Express.User | undefined => {
  const request: Request = context.switchToHttp().getRequest();
  return request.user;
};

export const User = createParamDecorator(userDecoratorFactory);
