import { Builder } from 'builder-pattern';

export class CandidateProfile {
  public readonly id: string;
  public readonly userDetailsId: string;
  public readonly position?: string | null;
  public readonly skills: string[];
  public readonly experience?: number | null;
  public readonly salaryExpectations?: number | null;
  public readonly englishLevel?: string | null;
  public readonly experienceDescription?: string | null;
  public readonly accomplishmentsDescription?: string | null;
  public readonly expectationsDescription?: string | null;
  public readonly employmentOptions?: string | null;
  public readonly hourlyRate?: number | null;
  public readonly preferredLanguage?: string | null;
  public readonly preferredCommunication?: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public get hasExperience(): boolean {
    return !!this.experience && this.experience > 0;
  }

  public get hasSalaryExpectations(): boolean {
    return !!this.salaryExpectations && this.salaryExpectations > 0;
  }

  public get hasHourlyRate(): boolean {
    return !!this.hourlyRate && this.hourlyRate > 0;
  }

  public get hasSkills(): boolean {
    return this.skills.length > 0;
  }

  public get isComplete(): boolean {
    return !!this.position && this.hasSkills && !!this.experienceDescription;
  }

  public static builder(userDetailsId: string) {
    return Builder(CandidateProfile, {
      userDetailsId,
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
