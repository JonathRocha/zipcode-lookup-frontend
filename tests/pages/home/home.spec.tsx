import { Home } from "@/pages/home";
import { render, screen } from "@testing-library/react";
import * as apolloClient from "@apollo/client";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
}));

jest.mock("@/hooks/useAddressSearch", () => ({
  useAddressSearch: jest.fn(() => ({
    search: jest.fn(),
  })),
  searchHistory: jest.fn(),
}));

const useReactiveVarSpy = jest.spyOn(apolloClient, "useReactiveVar");

describe(`Page Home`, () => {
  it(`Should render without crashing`, async () => {
    useReactiveVarSpy.mockReturnValue([]);

    render(<Home />);

    expect(screen.getByText("Search for your city")).toBeInTheDocument();
    expect(screen.queryByText("Yout last five searchs")).toBeNull();
  });

  it(`Should render history when there are addresses`, async () => {
    useReactiveVarSpy.mockReturnValue([
      { placeName: "placeName", country: "country", postCode: "postCode", state: "state", longitude: "0", latitude: "0" },
    ]);

    render(<Home />);

    expect(screen.getByText("Search for your city")).toBeInTheDocument();
    expect(screen.getByText("Your last five searchs")).toBeInTheDocument();
  });
});
