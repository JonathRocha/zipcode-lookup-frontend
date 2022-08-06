import { makeVar, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { Address, SEARCH_ADDRESS_QUERY } from "./definition";

// States
export const address = makeVar<Address | null>(null);
export const searchHistory = makeVar<Address[]>([]);
export const isFetchingAddress = makeVar(false);

// Hooks
export function useAddressSearch() {
  const { refetch: searchAddress } = useQuery(SEARCH_ADDRESS_QUERY, {
    skip: true,
  });

  const search = useCallback(
    async (zipCode: string, countryCode: string) => {
      isFetchingAddress(true);
      try {
        const { data } = await searchAddress({
          input: {
            zipCode,
            countryCode,
          },
        });

        if (data?.searchAddress) {
          address(data?.searchAddress);
          searchHistory(searchHistory().concat(data.searchAddress));
        } else {
          address(null);
          toast.info("Address not found!");
        }
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
