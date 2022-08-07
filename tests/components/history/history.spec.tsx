import { History } from "@/components/history";
import * as useAddressSearch from "@/hooks/useAddressSearch";
import { Address } from "@/hooks/useAddressSearch/definition";
import { fireEvent, render, screen } from "@testing-library/react";

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

jest.mock("@apollo/client", () => ({
  useReactiveVar: () => addresses,
}));

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
}));

jest.mock("@/hooks/useAddressSearch", () => ({
  searchHistory: jest.fn(),
}));

describe("History Component", () => {
  it("Should render without crashing", async () => {
    const address = addresses[0];
    const { placeName, country, postCode, state } = address;

    render(<History />);

    expect(screen.getByText("Your last five searchs")).toBeInTheDocument();
    expect(screen.getByText(`${placeName}, ${state} ${postCode} - ${country}`)).toBeInTheDocument();
  });

  it(`Should clear history when the button is clicked`, async () => {
    const spy = jest.spyOn(useAddressSearch, "searchHistory");

    render(<History />);

    fireEvent.click(screen.getByText("Clear history"));

    expect(spy).toHaveBeenCalledWith([]);
  });
});
