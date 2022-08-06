import { Form } from "@/components/form";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@apollo/client", () => ({
  useReactiveVar: jest.fn(),
}));

const searchMock = jest.fn();
const isFetchingAddressMock = jest.fn();

jest.mock("@/hooks/useAddressSearch", () => ({
  useAddressSearch: jest.fn(() => ({
    search: searchMock,
  })),
  isFetchingAddress: isFetchingAddressMock,
}));

describe("Form Component", () => {
  it("Should render without crashing", async () => {
    isFetchingAddressMock.mockReturnValue(false);

    render(<Form />);

    expect(screen.getByText("Search for your city")).toBeInTheDocument();
    expect(screen.getByTestId("countryCode")).toBeInTheDocument();
    expect(screen.getByTestId("zipCode")).toBeInTheDocument();
    expect(screen.getByTestId("lookup-submit")).toBeInTheDocument();
  });

  it(`Should disable the submit button when the form is loading`, async () => {
    isFetchingAddressMock.mockReturnValue(true);

    render(<Form />);

    expect(screen.getByTestId("lookup-submit")).toBeDisabled();
  });

  it(`Should disable the submit button when zipCode input is empty`, async () => {
    isFetchingAddressMock.mockReturnValue(false);

    render(<Form />);

    expect(screen.getByTestId("lookup-submit")).toBeDisabled();
  });

  it(`Should enable the submit button when zipCode input is not empty`, async () => {
    isFetchingAddressMock.mockReturnValue(false);

    render(<Form />);

    fireEvent.change(screen.getByTestId("zipCode"), { target: { value: "12345" } });
    expect(screen.getByTestId("lookup-submit")).not.toBeDisabled();
  });
});
