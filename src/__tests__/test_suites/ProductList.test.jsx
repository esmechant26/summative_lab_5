import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProductList from "../../components/ProductList";

describe("ProductList", () => {
  it("renders each product in a box with title and price", () => {
    const products = [
      { id: 1, title: "Filter A", price: 35, inStock: true },
      { id: 2, title: "Compressor B", price: 120, inStock: false },
    ];

    render(
      <MemoryRouter>
        <ProductList products={products} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Filter A")).toBeInTheDocument();
    expect(screen.getByText("Price: $35")).toBeInTheDocument();
    expect(screen.getByText("Compressor B")).toBeInTheDocument();
    expect(screen.getByText("Price: $120")).toBeInTheDocument();
  });
});
