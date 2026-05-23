import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductForm from "../../components/ProductForm";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it("shows validation error when price is invalid", async () => {
    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/product title/i), { target: { value: "New Fan" } });
    fireEvent.change(screen.getByLabelText(/price \(\$\)/i), { target: { value: "-1" } });
    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    expect(await screen.findByText(/price must be a positive number/i)).toBeInTheDocument();
  });

  it("submits the form and navigates to the new product details page", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 10, title: "New Fan", price: 59.99, inStock: true }),
      }),
    );

    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/product title/i), { target: { value: "New Fan" } });
    fireEvent.change(screen.getByLabelText(/price \(\$\)/i), { target: { value: "59.99" } });
    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/products/10"));
  });
});
