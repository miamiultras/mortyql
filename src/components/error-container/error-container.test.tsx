import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ErrorContainer } from "./error-container.component";

describe("ErrorContainer", () => {
  test("renders container with proper message", () => {
    render(
      <MemoryRouter>
        <ErrorContainer>
          <h1>Something went wrong!</h1>
        </ErrorContainer>
      </MemoryRouter>
    );
    expect(screen.getByTestId("error-container")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });
});
