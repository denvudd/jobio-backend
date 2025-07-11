import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';

export const PaginationQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryDto => {
    const request = ctx.switchToHttp().getRequest();
    const { page, limit, offset } = request.query;

    return {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      offset: offset ? parseInt(offset, 10) : undefined,
    };
  },
); 