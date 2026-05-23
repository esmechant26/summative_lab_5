import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const product = { id: 1, title: "Cooler", price: 79.99, inStock: true };

describe("ProductCard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading then displays fetched product details", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(product) }));

    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductCard />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading product/i)).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /cooler/i })).toBeInTheDocument();
    expect(screen.getByText(/price: \$79.99/i)).toBeInTheDocument();
    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
  });
});
