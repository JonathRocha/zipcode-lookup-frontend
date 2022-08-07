import { Address, SEARCH_ADDRESS_QUERY } from "@/hooks/useAddressSearch/definition";
import { makeVar, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "react-toastify";

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
          const newHistory = searchHistory().concat(data.searchAddress);
          searchHistory(newHistory.length > 5 ? newHistory.slice(1, 6) : newHistory);
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
