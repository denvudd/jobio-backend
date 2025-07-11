import { PaginationQueryDto } from '../dto/pagination.dto';
import { PaginationResult } from '../models/pagination.model';

export interface IPaginationService {
  paginate<T>(
    items: T[],
    total: number,
    query: PaginationQueryDto,
    baseUrl: string,
  ): PaginationResult<T>;

  calculateOffset(page: number, limit: number): number;
  calculateTotalPages(total: number, limit: number): number;
  buildPaginationUrl(baseUrl: string, page: number, limit: number): string;
} 