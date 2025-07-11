import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';
import { IGetAllSubcategoriesUseCase } from '~modules/categories/application/use-cases/subcategories/get-all-subcategories/get-all-subcategories-use-case.interface';
import { IGetSubcategoriesByCategoryIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategories-by-category-id/get-subcategories-by-category-id-use-case.interface';
import { IGetSubcategoryByIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-id/get-subcategory-by-id-use-case.interface';
import { IGetSubcategoryByNameUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-name/get-subcategory-by-name-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';

import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';
import { PaginationResult } from '~shared/application/models/pagination.model';
import { PaginationQuery } from '~shared/infrastructure/decorators/pagination/pagination.decorator';

@ApiTags('subcategories')
@PublicRoute()
@Controller('subcategories')
export class SubcategoriesController {
  constructor(
    @Inject(CategoriesDiToken.GET_ALL_SUB_CATEGORIES_USE_CASE)
    private readonly getAllSubcategoriesUseCase: IGetAllSubcategoriesUseCase,
    @Inject(CategoriesDiToken.GET_SUB_CATEGORY_BY_ID_USE_CASE)
    private readonly getSubcategoryByIdUseCase: IGetSubcategoryByIdUseCase,
    @Inject(CategoriesDiToken.GET_SUB_CATEGORY_BY_NAME_USE_CASE)
    private readonly getSubcategoryByNameUseCase: IGetSubcategoryByNameUseCase,
    @Inject(CategoriesDiToken.GET_SUB_CATEGORIES_BY_CATEGORY_ID_USE_CASE)
    private readonly getSubcategoriesByCategoryIdUseCase: IGetSubcategoriesByCategoryIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiQuery({ type: PaginationQueryDto })
  @ApiResponse({ type: PaginationResult })
  @Get()
  async getSubcategories(@PaginationQuery() query: PaginationQueryDto) {
    return this.getAllSubcategoriesUseCase.execute(query);
  }

  @ApiOperation({ summary: 'Get subcategories by category id' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiQuery({ type: PaginationQueryDto })
  @ApiResponse({ type: PaginationResult })
  @Get('by-category/:id')
  async getSubcategoriesByCategoryId(@Param('id') id: string, @PaginationQuery() query: PaginationQueryDto) {
    return this.getSubcategoriesByCategoryIdUseCase.execute({ categoryId: id, ...query });
  }

  @ApiOperation({ summary: 'Get a subcategory by id' })
  @Get('id/:id')
  async getSubcategory(@Param('id') id: string) {
    return this.getSubcategoryByIdUseCase.execute({ id });
  }

  @ApiOperation({ summary: 'Get a subcategory by name' })
  @Get('name/:name')
  async getSubcategoryByName(@Param('name') name: string) {
    return this.getSubcategoryByNameUseCase.execute({ name });
  }
}
