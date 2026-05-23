import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPortal from "../../components/AdminPortal";

const products = [{ id: 1, title: "Filter A", price: 35, inStock: true }];

describe("AdminPortal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows an error for invalid login", async () => {
    render(
      <MemoryRouter>
        <AdminPortal />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "baduser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "badpass" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid username or password/i)).toBeInTheDocument();
  });

  it("logs in with valid credentials and fetches product list", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(products) }));

    render(
      <MemoryRouter>
        <AdminPortal />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByRole("heading", { name: /admin portal/i })).toBeInTheDocument();
    expect(screen.getByText(/manage products/i)).toBeInTheDocument();
    expect(screen.getByText(/filter a/i)).toBeInTheDocument();
  });
});
