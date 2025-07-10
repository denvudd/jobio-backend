import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';
import { IGetAllCategoriesUseCase } from '~modules/categories/application/use-cases/categories/get-all-categories/get-all-categories-use-case.interface';
import { IGetCategoryByIdUseCase } from '~modules/categories/application/use-cases/categories/get-category-by-id/get-category-by-id-use-case.interface';
import { IGetCategoryByNameUseCase } from '~modules/categories/application/use-cases/categories/get-category-by-name/get-category-by-name-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';

@ApiTags('categories')
@PublicRoute()
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CategoriesDiToken.GET_ALL_CATEGORIES_USE_CASE)
    private readonly getAllCategoriesUseCase: IGetAllCategoriesUseCase,
    @Inject(CategoriesDiToken.GET_CATEGORY_BY_ID_USE_CASE)
    private readonly getCategoryByIdUseCase: IGetCategoryByIdUseCase,
    @Inject(CategoriesDiToken.GET_CATEGORY_BY_NAME_USE_CASE)
    private readonly getCategoryByNameUseCase: IGetCategoryByNameUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async getCategories() {
    // TODO: Add pagination
    return this.getAllCategoriesUseCase.execute(null);
  }

  @ApiOperation({ summary: 'Get a category by id' })
  @Get('id/:id')
  async getCategory(@Param('id') id: string) {
    return this.getCategoryByIdUseCase.execute({ id });
  }

  @ApiOperation({ summary: 'Get a category by name' })
  @Get('name/:name')
  async getCategoryByName(@Param('name') name: string) {
    return this.getCategoryByNameUseCase.execute({ name });
  }
}
