import { Builder } from 'builder-pattern';

export class CandidateProfile {
  public readonly id: string;
  public readonly userDetailsId: string;
  public readonly position?: string;
  public readonly skills: string[];
  public readonly experience?: number;
  public readonly salaryExpectations?: number;
  public readonly englishLevel?: string;
  public readonly experienceDescription?: string;
  public readonly accomplishmentsDescription?: string;
  public readonly expectationsDescription?: string;
  public readonly employmentOptions?: string;
  public readonly hourlyRate?: number;
  public readonly preferredLanguage?: string;
  public readonly preferredCommunication?: string;
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

  public static builder(id: string, userDetailsId: string) {
    return Builder(CandidateProfile, { 
      id, 
      userDetailsId, 
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
} 