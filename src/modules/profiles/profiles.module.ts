import { Module } from '@nestjs/common';

import { AuthModule } from '~modules/auth/auth.module';

import { SharedModule } from '~shared/shared.module';

import { CreateUserProfileUseCase } from './application/use-cases/create-user-profile/create-user-profile.use-case';
import { GetUserProfileWithAuthUseCase } from './application/use-cases/get-user-profile-with-auth/get-user-profile-with-auth.use-case';
import { UpdateCandidateProfileUseCase } from './application/use-cases/update-candidate-profile/update-candidate-profile.use-case';
import { UpdateRecruiterProfileUseCase } from './application/use-cases/update-recruiter-profile/update-recruiter-profile.use-case';
import { ProfilesDiToken } from './constants';
import { CandidateProfileMapper } from './domain/mappers/candidate-profile/candidate-profile.mapper';
import { RecruiterProfileMapper } from './domain/mappers/recruiter-profile/recruiter-profile.mapper';
import { UserDetailsMapper } from './domain/mappers/user-details/user-details.mapper';
import { ProfilesController } from './infrastructure/controllers/profiles/profiles.controller';
import { UserCreatedEventHandler } from './infrastructure/event-handlers/user-created.event-handler';
import { DrizzleCandidateProfileRepository } from './infrastructure/persistence/drizzle/repositories/drizzle-candidate-profile.repository';
import { DrizzleRecruiterProfileRepository } from './infrastructure/persistence/drizzle/repositories/drizzle-recruiter-profile.repository';
import { DrizzleUserDetailsRepository } from './infrastructure/persistence/drizzle/repositories/drizzle-user-details.repository';

@Module({
  imports: [AuthModule, SharedModule],
  providers: [
    UserDetailsMapper,
    CandidateProfileMapper,
    RecruiterProfileMapper,
    { provide: ProfilesDiToken.USER_DETAILS_REPOSITORY, useClass: DrizzleUserDetailsRepository },
    { provide: ProfilesDiToken.CANDIDATE_PROFILE_REPOSITORY, useClass: DrizzleCandidateProfileRepository },
    { provide: ProfilesDiToken.RECRUITER_PROFILE_REPOSITORY, useClass: DrizzleRecruiterProfileRepository },
    { provide: ProfilesDiToken.CREATE_USER_PROFILE_USE_CASE, useClass: CreateUserProfileUseCase },
    { provide: ProfilesDiToken.GET_USER_PROFILE_WITH_AUTH_USE_CASE, useClass: GetUserProfileWithAuthUseCase },
    { provide: ProfilesDiToken.UPDATE_CANDIDATE_PROFILE_USE_CASE, useClass: UpdateCandidateProfileUseCase },
    { provide: ProfilesDiToken.UPDATE_RECRUITER_PROFILE_USE_CASE, useClass: UpdateRecruiterProfileUseCase },
    UserCreatedEventHandler,
  ],
  controllers: [ProfilesController],
  exports: [
    ProfilesDiToken.CREATE_USER_PROFILE_USE_CASE,
    ProfilesDiToken.GET_USER_PROFILE_WITH_AUTH_USE_CASE,
    ProfilesDiToken.UPDATE_CANDIDATE_PROFILE_USE_CASE,
    ProfilesDiToken.UPDATE_RECRUITER_PROFILE_USE_CASE,
    UserCreatedEventHandler,
  ],
})
export class ProfilesModule {}
