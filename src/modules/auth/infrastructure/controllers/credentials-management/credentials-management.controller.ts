import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResetPasswordDto } from '~modules/auth/application/dto/reset-password.dto';
import { SendResetPasswordConfirmationDto } from '~modules/auth/application/dto/send-reset-password-confirmation.dto';
import { UpdateUserEmailDto } from '~modules/auth/application/dto/update-user-email.dto';
import { UpdateUserPasswordDto } from '~modules/auth/application/dto/update-user-password.dto';
import { IChangeEmailUseCase } from '~modules/auth/application/use-cases/change-email/change-email-use-case.interface';
import { IChangePasswordUseCase } from '~modules/auth/application/use-cases/change-password/change-password-use-case.interface';
import { IResetPasswordUseCase } from '~modules/auth/application/use-cases/reset-password/reset-password-use-case.interface';
import { ISendResetPasswordConfirmationUseCase } from '~modules/auth/application/use-cases/send-reset-password-confirmation/send-reset-password-confirmation-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { User } from '~modules/auth/domain/entities/user.entity';
import { AuthenticateSupabaseClient } from '~modules/auth/infrastructure/decorators/authenticate-supabase-client/authenticate-supabase-client.decorator';
import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';
import { UserId } from '~modules/auth/infrastructure/decorators/user-id/user-id.decorator';
import { ReqUser } from '~modules/auth/infrastructure/decorators/user/user.decorator';

@ApiTags('auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth/credentials')
export class CredentialsManagementController {
  constructor(
    @Inject(AuthDiToken.CHANGE_PASSWORD_USE_CASE) private readonly changePasswordUseCase: IChangePasswordUseCase,
    @Inject(AuthDiToken.CHANGE_EMAIL_USE_CASE) private readonly changeEmailUseCase: IChangeEmailUseCase,
    @Inject(AuthDiToken.SEND_RESET_PASSWORD_CONFIRMATION_USE_CASE)
    private readonly sendResetPasswordConfirmationUseCase: ISendResetPasswordConfirmationUseCase,
    @Inject(AuthDiToken.RESET_PASSWORD_USE_CASE) private readonly resetPasswordUseCase: IResetPasswordUseCase,
  ) {}

  @AuthenticateSupabaseClient()
  @ApiOperation({
    operationId: 'changePassword',
    summary: 'Change password',
    description: 'Change the password for the authenticated user',
  })
  @Post('/password')
  public async changePassword(@Body() dto: UpdateUserPasswordDto, @UserId() userId: string) {
    return this.changePasswordUseCase.execute({ updateDto: dto, userId });
  }

  @AuthenticateSupabaseClient()
  @ApiOperation({
    operationId: 'changeEmail',
    summary: 'Change email',
    description: 'Change the email for the authenticated user',
  })
  @Post('/email')
  public async changeEmail(@Body() dto: UpdateUserEmailDto) {
    return this.changeEmailUseCase.execute(dto);
  }

  @PublicRoute()
  @ApiOperation({
    operationId: 'sendPasswordResetConfirmation',
    summary: 'Send password reset confirmation',
    description: 'Send a password reset confirmation email to the user',
  })
  @Post('/password/send-reset-confirmation')
  public async sendPasswordResetConfirmation(@Body() dto: SendResetPasswordConfirmationDto) {
    return this.sendResetPasswordConfirmationUseCase.execute(dto);
  }

  @AuthenticateSupabaseClient()
  @ApiOperation({
    operationId: 'resetPassword',
    summary: 'Reset password',
    description: 'Reset the password for the authenticated user',
  })
  @Post('/password/reset')
  public async resetPassword(@Body() dto: ResetPasswordDto, @ReqUser() user: User) {
    return this.resetPasswordUseCase.execute({
      newPassword: dto.newPassword,
      user,
    });
  }
}
