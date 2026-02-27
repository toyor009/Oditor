import type { UserBusiness } from '@/types/business';

export interface LoggedInUser {
  accessToken: string;
  accountStatus: 'Deactivated' | 'Active';
  profileInfo: UserProfile;
  selectedBusinessKey?: string;
}
export interface UserProfile {
  firstName: string;
  lastName: string;
  roleName: string;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  email: string | null;
  isEmailVerified: boolean;
  businessEmail: string;
  currentBusinessKey: string;
  vatApplicationType: string;
  businessProfiles: Array<UserBusiness>;
}
