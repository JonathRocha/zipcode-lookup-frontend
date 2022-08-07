import { Address } from "@/hooks/useAddressSearch/definition";
import { Map } from "@/pages/map";
import * as apolloClient from "@apollo/client";
import { render, screen } from "@testing-library/react";
import * as reactRouterDom from "react-router-dom";

const searchStub = jest.fn();
const addresses: Address[] = [
  {
    placeName: "placeName",
    state: "state",
    postCode: "postCode",
    country: "country",
    countryCode: "countryCode",
    longitude: "0",
    latitude: "0",
  },
];

jest.mock("ol");

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("@/hooks/useAddressSearch", () => ({
  useAddressSearch: jest.fn(() => ({
    search: searchStub,
  })),
  isFetchingAddress: jest.fn(),
  searchHistory: jest.fn(),
}));

const useParamsSpy = jest.spyOn(reactRouterDom, "useParams");
const useReactiveVarSpy = jest.spyOn(apolloClient, "useReactiveVar");

describe("Page Map", () => {
  beforeEach(() => {
    useParamsSpy.mockReturnValue({
      countryCode: "countryCode",
      zipCode: "postCode",
    });
  });

  it("Should render without crashing", async () => {
    useReactiveVarSpy.mockReturnValueOnce(addresses).mockReturnValueOnce(false);

    const [address] = addresses;
    const { placeName, state, postCode, country } = address;

    render(<Map />);

    expect(screen.getByText(`${placeName}, ${state} ${postCode} - ${country}`)).toBeInTheDocument();
  });
});
