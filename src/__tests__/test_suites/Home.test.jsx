import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../components/Home";

describe("Home page", () => {
  it("renders the app description and about link", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /welcome to the air con sales/i })).toBeInTheDocument();
    expect(screen.getByText(/air con sales is a product catalog/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn more about this app/i })).toBeInTheDocument();
  });
});
