import { Inject, Injectable } from '@nestjs/common';

import { EventsHandler } from '~lib/nest-event-driven';

import { UserCreatedEvent } from '~modules/auth/domain/events/user-created.event';
import { ICreateUserProfileUseCase } from '~modules/profiles/application/use-cases/create-user-profile/create-user-profile-use-case.interface';
import { ProfilesDiToken } from '~modules/profiles/constants';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler {
  constructor(
    @Inject(ProfilesDiToken.CREATE_USER_PROFILE_USE_CASE)
    private readonly createUserProfileUseCase: ICreateUserProfileUseCase,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    if (!this.createUserProfileUseCase) {
      throw new Error('createUserProfileUseCase is undefined in UserCreatedEventHandler');
    }

    const { user, role } = event.payload;

    await this.createUserProfileUseCase.execute({
      userId: user.id,
      role,
    });
  }
}
