import { Module } from '@nestjs/common';

import { GetAllCategoriesUseCase } from '~modules/categories/application/use-cases/categories/get-all-categories/get-all-categories.use-case';
import { GetCategoryByIdUseCase } from '~modules/categories/application/use-cases/categories/get-category-by-id/get-category-by-id.use-case';
import { GetCategoryByNameUseCase } from '~modules/categories/application/use-cases/categories/get-category-by-name/get-category-by-name.use-case';
import { GetAllSubcategoriesUseCase } from '~modules/categories/application/use-cases/subcategories/get-all-subcategories/get-all-subcategories.use-case';
import { GetSubcategoriesByCategoryIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategories-by-category-id/get-subcategories-by-category-id.use-case';
import { GetSubcategoryByIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-id/get-subcategory-by-id.use-case';
import { GetSubcategoryByNameUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-name/get-subcategory-by-name.use-case';
import { CategoriesDiToken } from '~modules/categories/constants';
import { CategoryMapper } from '~modules/categories/domain/mappers/category/category.mapper';
import { SubCategoryMapper } from '~modules/categories/domain/mappers/subcategory/subcategory.mapper';
import { CategoriesController } from '~modules/categories/infrastructure/controllers/categories/categories.controller';
import { SubcategoriesController } from '~modules/categories/infrastructure/controllers/subcategories/subcategories.controller';
import { DrizzleCategoryRepository } from '~modules/categories/infrastructure/persistence/drizzle/repositories/drizzle-category.repository';
import { DrizzleSubCategoryRepository } from '~modules/categories/infrastructure/persistence/drizzle/repositories/drizzle-subcategory.repository';

import { SharedModule } from '~shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [
    CategoryMapper,
    SubCategoryMapper,
    { provide: CategoriesDiToken.CATEGORY_REPOSITORY, useClass: DrizzleCategoryRepository },
    { provide: CategoriesDiToken.SUB_CATEGORY_REPOSITORY, useClass: DrizzleSubCategoryRepository },
    { provide: CategoriesDiToken.GET_ALL_CATEGORIES_USE_CASE, useClass: GetAllCategoriesUseCase },
    { provide: CategoriesDiToken.GET_CATEGORY_BY_ID_USE_CASE, useClass: GetCategoryByIdUseCase },
    { provide: CategoriesDiToken.GET_CATEGORY_BY_NAME_USE_CASE, useClass: GetCategoryByNameUseCase },
    { provide: CategoriesDiToken.GET_ALL_SUB_CATEGORIES_USE_CASE, useClass: GetAllSubcategoriesUseCase },
    { provide: CategoriesDiToken.GET_SUB_CATEGORY_BY_ID_USE_CASE, useClass: GetSubcategoryByIdUseCase },
    { provide: CategoriesDiToken.GET_SUB_CATEGORY_BY_NAME_USE_CASE, useClass: GetSubcategoryByNameUseCase },
    {
      provide: CategoriesDiToken.GET_SUB_CATEGORIES_BY_CATEGORY_ID_USE_CASE,
      useClass: GetSubcategoriesByCategoryIdUseCase,
    },
  ],
  controllers: [CategoriesController, SubcategoriesController],
  exports: [
    CategoriesDiToken.GET_ALL_CATEGORIES_USE_CASE,
    CategoriesDiToken.GET_CATEGORY_BY_ID_USE_CASE,
    CategoriesDiToken.GET_CATEGORY_BY_NAME_USE_CASE,
    CategoriesDiToken.GET_ALL_SUB_CATEGORIES_USE_CASE,
    CategoriesDiToken.GET_SUB_CATEGORY_BY_ID_USE_CASE,
    CategoriesDiToken.GET_SUB_CATEGORY_BY_NAME_USE_CASE,
  ],
})
export class CategoriesModule {}
