import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

test("renders title", () => {
  render(
    <MemoryRouter>
      <App>
        <div>children</div>
      </App>
    </MemoryRouter>
  );
  expect(screen.getByText("mortyQL 🧪")).toBeInTheDocument();
  expect(screen.getByText("children")).toBeInTheDocument();
});
