import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

global.fetch = global.fetch ?? vi.fn();

global.baseTasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Finish React project", completed: false },
];

global.setFetchResponse = (val) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(val),
      ok: true,
      status: 200,
    }),
  );
};

afterEach(() => {
  cleanup();
});
