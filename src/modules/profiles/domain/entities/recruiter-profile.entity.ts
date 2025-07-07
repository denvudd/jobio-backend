import { Builder } from 'builder-pattern';

export class RecruiterProfile {
  public readonly id: string;
  public readonly userDetailsId: string;
  public readonly telegram?: string | null;
  public readonly phone?: string | null;
  public readonly linkedin?: string | null;
  public readonly company?: string | null;
  public readonly website?: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public get hasContactInfo(): boolean {
    return !!(this.telegram || this.phone || this.linkedin);
  }

  public get hasCompanyInfo(): boolean {
    return !!(this.company || this.website);
  }

  public get isComplete(): boolean {
    return this.hasContactInfo && this.hasCompanyInfo;
  }

  public get primaryContact(): string | null {
    return this.telegram || this.phone || this.linkedin || null;
  }

  public static builder(id: string, userDetailsId: string) {
    return Builder(RecruiterProfile, {
      id,
      userDetailsId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
