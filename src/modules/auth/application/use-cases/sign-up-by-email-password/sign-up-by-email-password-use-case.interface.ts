import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { SignUpCredentialsDto } from '../../dto/sign-up-credentials.dto';

export interface ISignUpByEmailPasswordUseCase extends IUseCase<SignUpCredentialsDto, void> {}
