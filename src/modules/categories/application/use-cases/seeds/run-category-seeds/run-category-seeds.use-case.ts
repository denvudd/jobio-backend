import { Inject, Injectable } from '@nestjs/common';

import { CategoriesDiToken } from '~modules/categories/constants';
import { Category } from '~modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/categories/domain/repositories/category-repository.interface';

import { BaseSeedUseCase } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed.use-case';

@Injectable()
export class RunCategorySeedsUseCase extends BaseSeedUseCase {
  constructor(
    @Inject(CategoriesDiToken.CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {
    super(RunCategorySeedsUseCase.name);
  }

  protected async clearAll(): Promise<void> {
    await this.categoryRepository.deleteAll();
  }

  protected getSeeds(): Array<{ name: string }> {
    return [
      { name: 'Technology' },
      { name: 'Healthcare' },
      { name: 'Finance' },
      { name: 'Education' },
      { name: 'Marketing' },
      { name: 'Sales' },
      { name: 'Customer Service' },
      { name: 'Human Resources' },
      { name: 'Operations' },
      { name: 'Legal' },
      { name: 'Consulting' },
      { name: 'Manufacturing' },
      { name: 'Retail' },
      { name: 'Transportation' },
      { name: 'Real Estate' },
      { name: 'Media & Entertainment' },
      { name: 'Non-profit' },
      { name: 'Government' },
      { name: 'Research & Development' },
      { name: 'Other' },
    ];
  }

  protected async createSeed(seed: { name: string }): Promise<boolean> {
    const category = Category.builder(seed.name).build();
    await this.categoryRepository.create(category);
    return true;
  }
}
