import { Form } from "@/components/form";
import { render, screen } from "@testing-library/react";

jest.mock("@apollo/client", () => ({
  useReactiveVar: jest.fn(),
}));

jest.mock("@/hooks/useAddressSearch", () => ({
  useAddressSearch: jest.fn(() => ({
    search: jest.fn(),
  })),
  isFetchingAddress: false,
}));

describe("Form Component", () => {
  it("Should render without crashing", async () => {
    render(<Form />);

    expect(screen.getByText("Search for your city")).toBeInTheDocument();
    expect(screen.getByTestId("countryCode")).toBeInTheDocument();
    expect(screen.getByTestId("zipCode")).toBeInTheDocument();
    expect(screen.getByTestId("lookup-submit")).toBeInTheDocument();
  });
});
