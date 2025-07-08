import { Module } from '@nestjs/common';

import { AuthModule } from '~modules/auth/auth.module';
import { CreateUserProfileUseCase } from '~modules/profiles/application/use-cases/create-user-profile/create-user-profile.use-case';
import { GetUserProfileWithAuthUseCase } from '~modules/profiles/application/use-cases/get-user-profile-with-auth/get-user-profile-with-auth.use-case';
import { UpdateCandidateProfileUseCase } from '~modules/profiles/application/use-cases/update-candidate-profile/update-candidate-profile.use-case';
import { UpdateRecruiterProfileUseCase } from '~modules/profiles/application/use-cases/update-recruiter-profile/update-recruiter-profile.use-case';
import { ProfilesDiToken } from '~modules/profiles/constants';
import { CandidateProfileMapper } from '~modules/profiles/domain/mappers/candidate-profile/candidate-profile.mapper';
import { RecruiterProfileMapper } from '~modules/profiles/domain/mappers/recruiter-profile/recruiter-profile.mapper';
import { UserDetailsMapper } from '~modules/profiles/domain/mappers/user-details/user-details.mapper';
import { ProfilesController } from '~modules/profiles/infrastructure/controllers/profiles/profiles.controller';
import { UserCreatedEventHandler } from '~modules/profiles/infrastructure/event-handlers/user-created.event-handler';
import { DrizzleCandidateProfileRepository } from '~modules/profiles/infrastructure/persistence/drizzle/repositories/drizzle-candidate-profile.repository';
import { DrizzleRecruiterProfileRepository } from '~modules/profiles/infrastructure/persistence/drizzle/repositories/drizzle-recruiter-profile.repository';
import { DrizzleUserDetailsRepository } from '~modules/profiles/infrastructure/persistence/drizzle/repositories/drizzle-user-details.repository';

import { SharedModule } from '~shared/shared.module';

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
