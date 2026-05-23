import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../components/NavBar";

describe("NavBar", () => {
  it("renders main navigation links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute("href", "/shop");
    expect(screen.getByRole("link", { name: /admin portal login/i })).toHaveAttribute("href", "/admin");
  });
});
