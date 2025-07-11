import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Number of items on current page',
    example: 10,
  })
  itemCount: number;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  hasPreviousPage: boolean;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  hasNextPage: boolean;
}

export class PaginationResult<T> {
  @ApiProperty({
    description: 'Array of items for the current page',
  })
  results: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  meta: PaginationMeta;

  @ApiProperty({
    description: 'Link to the previous page',
    example: '/api/categories?page=1&limit=10',
    nullable: true,
  })
  prev: string | null;

  @ApiProperty({
    description: 'Link to the next page',
    example: '/api/categories?page=3&limit=10',
    nullable: true,
  })
  next: string | null;
} 