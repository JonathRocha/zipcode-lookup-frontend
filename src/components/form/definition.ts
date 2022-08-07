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

type Country = {
  code: string;
  name: string;
};

export const selectableCountry: Country[] = [
  { code: "US", name: "United States" },
  { code: "BR", name: "Brazil" },
  { code: "AD", name: "Andorra" },
  { code: "AR", name: "Argentina" },
  { code: "AS", name: "American Samoa" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "DO", name: "Dominican Republic" },
  { code: "ES", name: "Spain" },
  { code: "FI", name: "Finland" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FR", name: "France" },
  { code: "GB", name: "Great Britain" },
  { code: "GF", name: "French Guiana" },
  { code: "GG", name: "Guernsey" },
  { code: "GL", name: "Greenland" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GT", name: "Guatemala" },
  { code: "GU", name: "Guam" },
  { code: "GY", name: "Guyana" },
  { code: "HR", name: "Croatia" },
  { code: "HU", name: "Hungary" },
  { code: "IM", name: "Isle of Man" },
  { code: "IN", name: "India" },
  { code: "IS", name: "Iceland" },
  { code: "IT", name: "Italy" },
  { code: "JE", name: "Jersey" },
  { code: "JP", name: "Japan" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LK", name: "Sri Lanka" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MC", name: "Monaco" },
  { code: "MD", name: "Moldova" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MK", name: "Macedonia" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MX", name: "Mexico" },
  { code: "MY", name: "Malaysia" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NZ", name: "New Zealand" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "PR", name: "Puerto Rico" },
  { code: "PT", name: "Portugal" },
  { code: "RE", name: "French Reunion" },
  { code: "RU", name: "Russia" },
  { code: "SE", name: "Sweden" },
  { code: "SI", name: "Slovenia" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SK", name: "Slovakia" },
  { code: "SM", name: "San Marino" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "VA", name: "Vatican" },
  { code: "VI", name: "Virgin Islands" },
  { code: "YT", name: "Mayotte" },
  { code: "ZA", name: "South Africa" },
];
