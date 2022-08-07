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

  it("Should render without crashing", () => {
    useReactiveVarSpy.mockReturnValueOnce(addresses).mockReturnValueOnce(false);

    const [address] = addresses;
    const { placeName, state, postCode, country } = address;

    render(<Map />);

    expect(screen.getByText(`${placeName}, ${state} ${postCode} - ${country}`)).toBeInTheDocument();
  });

  it("Should render loading when fetching address", () => {
    useReactiveVarSpy.mockReturnValueOnce([]).mockReturnValueOnce(true);

    render(<Map />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it(`Should search for address if history is empty`, () => {
    useReactiveVarSpy.mockReturnValueOnce([]).mockReturnValueOnce(false);

    render(<Map />);

    expect(searchStub).toHaveBeenCalledWith("postCode", "countryCode");
  });

  it(`Should search for address if params do not match any history element`, () => {
    useParamsSpy.mockReturnValue({
      countryCode: "notMatchCountryCode",
      zipCode: "notMatchPostCode",
    });
    useReactiveVarSpy.mockReturnValueOnce(addresses).mockReturnValueOnce(false);

    render(<Map />);

    expect(searchStub).toHaveBeenCalledWith("notMatchPostCode", "notMatchCountryCode");
  });

  it(`Should render fallback message if no address found`, () => {
    useReactiveVarSpy.mockReturnValueOnce([]).mockReturnValueOnce(false);

    render(<Map />);

    expect(screen.getByText("Sorry, we couldn't find an address.")).toBeInTheDocument();
  });
});
