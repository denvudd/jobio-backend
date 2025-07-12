import { Injectable } from '@nestjs/common';

import { UserCompany } from '~modules/companies/domain/entities/user-company.entity';

import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';

export interface IUserCompanyDataAccess {
  id: string;
  recruiterProfileId: string;
  companyId: string;
  companyRoleId: string;
  isActive: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserCompanyMapper implements IDataAccessMapper<UserCompany, IUserCompanyDataAccess> {
  toDomain(dataAccess: IUserCompanyDataAccess): UserCompany {
    return UserCompany.builder(
      dataAccess.recruiterProfileId,
      dataAccess.companyId,
      dataAccess.companyRoleId,
    )
      .id(dataAccess.id)
      .isActive(dataAccess.isActive)
      .joinedAt(dataAccess.joinedAt)
      .createdAt(dataAccess.createdAt)
      .updatedAt(dataAccess.updatedAt)
      .build();
  }

  toPersistence(domain: UserCompany): IUserCompanyDataAccess {
    return {
      id: domain.id,
      recruiterProfileId: domain.recruiterProfileId,
      companyId: domain.companyId,
      companyRoleId: domain.companyRoleId,
      isActive: domain.isActive,
      joinedAt: domain.joinedAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
} 