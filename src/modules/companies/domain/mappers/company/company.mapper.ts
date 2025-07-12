import { Injectable } from '@nestjs/common';

import { Company } from '~modules/companies/domain/entities/company.entity';

import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';

export interface ICompanyDataAccess {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo: string | null;
  industry: string | null;
  size: string | null;
  location: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CompanyMapper implements IDataAccessMapper<Company, ICompanyDataAccess> {
  toDomain(dataAccess: ICompanyDataAccess): Company {
    return Company.builder(dataAccess.name)
      .id(dataAccess.id)
      .description(dataAccess.description || undefined)
      .website(dataAccess.website || undefined)
      .logo(dataAccess.logo || undefined)
      .industry(dataAccess.industry || undefined)
      .size(dataAccess.size || undefined)
      .location(dataAccess.location || undefined)
      .isActive(dataAccess.isActive)
      .createdAt(dataAccess.createdAt)
      .updatedAt(dataAccess.updatedAt)
      .build();
  }

  toPersistence(domain: Company): ICompanyDataAccess {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description || null,
      website: domain.website || null,
      logo: domain.logo || null,
      industry: domain.industry || null,
      size: domain.size || null,
      location: domain.location || null,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
} 