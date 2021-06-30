import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Spinner } from "./spinner.component";

describe("Spinner", () => {
  test("renders without error", () => {
    render(
      <MemoryRouter>
        <Spinner />
      </MemoryRouter>
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
