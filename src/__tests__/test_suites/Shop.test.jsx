import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Shop from "../../components/Shop";

const products = [
  { id: 1, title: "Filter A", price: 35, inStock: true },
  { id: 2, title: "Compressor B", price: 120, inStock: false },
];

describe("Shop page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads products and displays them in boxes", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(products) }));

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/filter a/i)).toBeInTheDocument();
    expect(screen.getByText(/compressor b/i)).toBeInTheDocument();
    expect(screen.getByText(/price: \$35/i)).toBeInTheDocument();
  });

  it("filters product results when search input changes", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(products) }));

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText(/filter a/i)).toBeInTheDocument());

    const input = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(input, { target: { value: "compressor" } });

    expect(screen.queryByText(/filter a/i)).not.toBeInTheDocument();
    expect(screen.getByText(/compressor b/i)).toBeInTheDocument();
  });
});
