import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Search } from "./search.component";

describe("Search", () => {
  test("renders without error", () => {
    render(
      <MemoryRouter>
        <Search setQuery={jest.fn} />
      </MemoryRouter>
    );
    expect(screen.getByRole("textbox", { name: "search" })).toBeInTheDocument();
  });
});
