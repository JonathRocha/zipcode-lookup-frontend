export interface AddressLookupForm {
  zipCode: string;
  countryCode: string;
}

export enum AddressLookupFormActionType {
  SET_ZIP_CODE = "SET_ZIP_CODE",
  SET_COUNTRY = "SET_COUNTRY",
  RESET = "RESET",
}

export interface AddressLookupFormAction {
  type: AddressLookupFormActionType;
  payload: string;
}
