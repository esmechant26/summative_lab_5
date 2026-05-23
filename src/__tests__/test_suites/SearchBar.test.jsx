import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "../../components/SearchBar";

describe("SearchBar", () => {
  it("calls setSearch when the input changes", () => {
    const setSearch = vi.fn();
    render(<SearchBar setSearch={setSearch} />);

    const input = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(input, { target: { value: "cooler" } });

    expect(setSearch).toHaveBeenCalledWith("cooler");
  });
});
