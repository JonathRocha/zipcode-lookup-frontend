import { History } from "@/components/history";
import { Address } from "@/hooks/useAddressSearch/definition";
import { render, screen } from "@testing-library/react";

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

    expect(screen.getByText("Your searchs")).toBeInTheDocument();
    expect(screen.getByText(`${placeName}, ${state} ${postCode} - ${country}`)).toBeInTheDocument();
  });
});
