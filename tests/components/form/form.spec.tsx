import { Form } from "@/components/form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const searchStub = jest.fn();
const isFetchingAddressStub = jest.fn();

jest.mock("@apollo/client", () => ({
  useReactiveVar: jest.fn(),
}));

jest.mock("@/hooks/useAddressSearch", () => ({
  useAddressSearch: jest.fn(() => ({
    search: searchStub,
  })),
  isFetchingAddress: isFetchingAddressStub,
}));

describe("Form Component", () => {
  beforeEach(() => {
    isFetchingAddressStub.mockReturnValue(false);
  });

  it("Should render without crashing", async () => {
    render(<Form />);

    expect(screen.getByText("Search for your city")).toBeInTheDocument();
    expect(screen.getByTestId("countryCode")).toBeInTheDocument();
    expect(screen.getByTestId("zipCode")).toBeInTheDocument();
    expect(screen.getByTestId("lookup-submit")).toBeInTheDocument();
  });

  it(`Should disable the submit button when fetching address`, async () => {
    isFetchingAddressStub.mockReturnValue(true);

    render(<Form />);

    expect(screen.getByTestId("lookup-submit")).toBeDisabled();
  });

  it(`Should disable the submit button when zipCode input is empty`, async () => {
    render(<Form />);

    expect(screen.getByTestId("lookup-submit")).toBeDisabled();
  });

  it(`Should enable the submit button when zipCode input is not empty`, async () => {
    render(<Form />);

    fireEvent.change(screen.getByTestId("zipCode"), { target: { value: "12345" } });
    expect(screen.getByTestId("lookup-submit")).not.toBeDisabled();
  });

  it(`Should call search with the correct values when the form is submitted`, async () => {
    render(<Form />);

    fireEvent.change(screen.getByTestId("zipCode"), { target: { value: "12345" } });
    fireEvent.click(screen.getByTestId("lookup-submit"));

    expect(searchStub).toHaveBeenCalledWith("12345", "US");
  });

  it("Should reset the form after submit", async () => {
    render(<Form />);

    fireEvent.change(screen.getByTestId("zipCode"), { target: { value: "12345" } });
    fireEvent.change(screen.getByTestId("countryCode"), { target: { value: "BR" } });
    fireEvent.click(screen.getByTestId("lookup-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("zipCode")?.getAttribute("value")).toBe("");
      expect(screen.getByTestId("countryCode")?.getAttribute("value")).toBe(null);
      expect(screen.getByTestId("lookup-submit")).toBeDisabled();
    });
  });
});
