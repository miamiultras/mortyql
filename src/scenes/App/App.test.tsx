import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(
    <App>
      <div>children</div>
    </App>
  );
  expect(screen.getByText("mortyQL 🧪")).toBeInTheDocument();
  expect(screen.getByText("children")).toBeInTheDocument();
});
