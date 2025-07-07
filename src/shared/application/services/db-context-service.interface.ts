import { IUserRepository } from '~modules/auth/application/repositories/user-repository.interface';

export interface IDbContext {
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}

export interface IDbRepositories {
  userRepository: IUserRepository;
}

export interface IDbContext extends IDbRepositories {
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}
