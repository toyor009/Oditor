export interface LoggedInUser {
  accessToken: string;
  accountStatus: string;
  profileInfo: UserProfile;
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

export interface UserBusiness {
  businessKey: string;
  businessName: string;
  businessLogo: string | null;
  isBusinessNameEditable: boolean;
  currencySymbol: string;
  locationStatus: string;
  mainBusinessName: string | null;
  businessAddress: string;
}
