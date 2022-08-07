import { Home } from "@/pages/home";
import { render, screen } from "@testing-library/react";
import * as apolloClient from "@apollo/client";

jest.mock("@apollo/client", () => ({
  useReactiveVar: jest.fn(),
}));

jest.mock("@/hooks/useAddressSearch", () => ({
  useAddressSearch: jest.fn(() => ({
    search: jest.fn(),
  })),
  searchHistory: jest.fn(),
}));

describe(`Page Home`, () => {
  it(`Should render without crashing`, async () => {
    const spy = jest.spyOn(apolloClient, "useReactiveVar");
    spy.mockReturnValue([]);

    render(<Home />);

    expect(screen.getByText("Search for your city")).toBeInTheDocument();
    expect(screen.queryByText("Yout last five searchs")).toBeNull();
  });
});
