import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { extractAuthTokenOrThrow } from '~shared/infrastructure/util';

export const ReqSession = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  return request.session;
});

export const ReqAccessToken = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();

  const accessToken = extractAuthTokenOrThrow(request);

  if (accessToken) {
    return accessToken;
  }

  return null;
});
