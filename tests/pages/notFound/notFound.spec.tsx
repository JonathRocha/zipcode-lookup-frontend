import { render, screen } from "@testing-library/react";
import { NotFound } from "@/pages/notFound";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
}));

describe("NotFound page", () => {
  it("Should render without crashing", () => {
    render(<NotFound />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
