import { gql } from "@apollo/client";

export interface Address {
  placeName: string;
  state: string;
  country: string;
  countryCode: string;
  postCode: string;
  longitude: string;
  latitude: string;
}

export const SEARCH_ADDRESS_QUERY = gql`
  query SearchAddress($input: SearchAddressInput!) {
    searchAddress(input: $input) {
      placeName
      state
      country
      countryCode
      postCode
      longitude
      latitude
    }
  }
`;
