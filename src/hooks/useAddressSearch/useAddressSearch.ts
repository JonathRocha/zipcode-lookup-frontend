import { makeVar, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "react-toastify";
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
      if (data?.searchAddress) {
        searchHistory(searchHistory().concat(data.searchAddress));
      } else {
        toast.info("Address not found!");
      }
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
        toast.error("An unexpected error ocurred, please try again.");
      } finally {
        isFetchingAddress(false);
      }
    },
    [searchAddress],
  );

  return { search };
}
