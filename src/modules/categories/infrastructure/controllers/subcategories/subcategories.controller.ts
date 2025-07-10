import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';
import { IGetAllSubcategoriesUseCase } from '~modules/categories/application/use-cases/subcategories/get-all-subcategories/get-all-subcategories-use-case.interface';
import { IGetSubcategoriesByCategoryIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategories-by-category-id/get-subcategories-by-category-id-use-case.interface';
import { IGetSubcategoryByIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-id/get-subcategory-by-id-use-case.interface';
import { IGetSubcategoryByNameUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-name/get-subcategory-by-name-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';

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
  @Get()
  async getSubcategories() {
    // TODO: Add pagination
    return this.getAllSubcategoriesUseCase.execute(null);
  }

  @ApiOperation({ summary: 'Get subcategories by category id' })
  @Get('by-category/:id')
  async getSubcategoriesByCategoryId(@Param('id') id: string) {
    return this.getSubcategoriesByCategoryIdUseCase.execute({ categoryId: id });
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
