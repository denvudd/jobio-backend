import { Body, Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserId } from '~modules/auth/infrastructure/decorators/user-id/user-id.decorator';
import { JwtAccessAuthGuard } from '~modules/auth/infrastructure/supabase/guards/jwt-access-auth/jwt-access-auth.guard';
import { CreateUserProfileDto } from '~modules/profiles/application/dto/create-user-profile.dto';
import { UpdateCandidateProfileDto } from '~modules/profiles/application/dto/update-candidate-profile.dto';
import { UpdateRecruiterProfileDto } from '~modules/profiles/application/dto/update-recruiter-profile.dto';
import { ICreateUserProfileUseCase } from '~modules/profiles/application/use-cases/create-user-profile/create-user-profile-use-case.interface';
import { IGetUserProfileUseCase } from '~modules/profiles/application/use-cases/get-user-profile/get-user-profile-use-case.interface';
import { IUpdateCandidateProfileUseCase } from '~modules/profiles/application/use-cases/update-candidate-profile/update-candidate-profile-use-case.interface';
import { IUpdateRecruiterProfileUseCase } from '~modules/profiles/application/use-cases/update-recruiter-profile/update-recruiter-profile-use-case.interface';
import { ProfilesDiToken } from '~modules/profiles/constants';

@ApiTags('profiles')
@Controller('profiles')
@UseGuards(JwtAccessAuthGuard)
export class ProfilesController {
  constructor(
    @Inject(ProfilesDiToken.CREATE_USER_PROFILE_USE_CASE)
    private readonly createUserProfileUseCase: ICreateUserProfileUseCase,
    @Inject(ProfilesDiToken.GET_USER_PROFILE_USE_CASE)
    private readonly getUserProfileUseCase: IGetUserProfileUseCase,
    @Inject(ProfilesDiToken.UPDATE_CANDIDATE_PROFILE_USE_CASE)
    private readonly updateCandidateProfileUseCase: IUpdateCandidateProfileUseCase,
    @Inject(ProfilesDiToken.UPDATE_RECRUITER_PROFILE_USE_CASE)
    private readonly updateRecruiterProfileUseCase: IUpdateRecruiterProfileUseCase,
  ) {}

  @Post()
  async createProfile(@Body() createProfileDto: CreateUserProfileDto, @UserId() userId: string): Promise<void> {
    await this.createUserProfileUseCase.execute({
      ...createProfileDto,
      userId,
    });
  }

  @Get('me')
  async getMyProfile(@UserId() userId: string) {
    return this.getUserProfileUseCase.execute({ userId });
  }

  @Put('candidate')
  async updateCandidateProfile(@Body() updateDto: UpdateCandidateProfileDto, @UserId() userId: string) {
    return this.updateCandidateProfileUseCase.execute({
      ...updateDto,
      userId,
    });
  }

  @Put('recruiter')
  async updateRecruiterProfile(@Body() updateDto: UpdateRecruiterProfileDto, @UserId() userId: string) {
    return this.updateRecruiterProfileUseCase.execute({
      ...updateDto,
      userId,
    });
  }
}
