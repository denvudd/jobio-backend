import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';
import { PaginationMeta, PaginationResult } from '~shared/application/models/pagination.model';
import { IPaginationService } from '~shared/application/services/pagination-service.interface';

@Injectable()
export class PaginationService implements IPaginationService {
  paginate<T>(
    items: T[],
    total: number,
    query: PaginationQueryDto,
    baseUrl: string,
  ): PaginationResult<T> {
    const { page = 1, limit = 10 } = query;
    const totalPages = this.calculateTotalPages(total, limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      itemCount: items.length,
      hasPreviousPage,
      hasNextPage,
    };

    const prev = hasPreviousPage ? this.buildPaginationUrl(baseUrl, page - 1, limit) : null;
    const next = hasNextPage ? this.buildPaginationUrl(baseUrl, page + 1, limit) : null;

    return {
      results: items,
      meta,
      prev,
      next,
    };
  }

  calculateOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  calculateTotalPages(total: number, limit: number): number {
    return Math.ceil(total / limit);
  }

  buildPaginationUrl(baseUrl: string, page: number, limit: number): string {
    const url = new URL(baseUrl, 'http://localhost'); // Base URL for parsing
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());
    
    // Return only the path and query string
    return url.pathname + url.search;
  }
} 