import { makeVar, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { Address, SEARCH_ADDRESS_QUERY } from "./address.definition";

// States
export const address = makeVar<Address | null>(null);
export const searchHistory = makeVar<Address[]>([]);
export const isFetchingAddress = makeVar(false);

// Hooks
export function useAddressSearch() {
  const { refetch: searchAddress } = useQuery(SEARCH_ADDRESS_QUERY, {
    skip: true,
    onCompleted: (data) => {
      address(data?.searchAddress ?? null);
      data?.searchAddress && searchHistory(searchHistory().concat(data.searchAddress));
    },
  });

  const search = useCallback(
    async (zipcode: string, country: string) => {
      isFetchingAddress(true);
      try {
        await searchAddress({
          input: {
            zipcode,
            country,
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        isFetchingAddress(false);
      }
    },
    [searchAddress],
  );

  return { search };
}
