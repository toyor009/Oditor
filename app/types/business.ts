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
