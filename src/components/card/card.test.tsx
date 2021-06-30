import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Card } from "./card.component";

describe("Card", () => {
  test("renders content of the card without error", () => {
    render(
      <MemoryRouter>
        <Card>
          <div>children</div>
        </Card>
      </MemoryRouter>
    );
    expect(screen.getByText("children")).toBeInTheDocument();
  });
});
