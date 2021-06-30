import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Navbar } from "./navbar.component";

describe("Navbar", () => {
  test("renders logo", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: "mortyQL 🧪" })
    ).toBeInTheDocument();
  });

  test("renders links for large media devices", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      within(screen.getByTestId("menu")).getByRole("link", {
        name: "Characters",
      })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("menu")).getByRole("link", {
        name: "Episodes",
      })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("menu")).getByRole("link", {
        name: "Locations",
      })
    ).toBeInTheDocument();
  });

  test("renders hamburger and links for small media devices", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByTestId("hamburger")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("overlay-menu")).getByRole("link", {
        name: "Characters",
      })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("overlay-menu")).getByRole("link", {
        name: "Episodes",
      })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("overlay-menu")).getByRole("link", {
        name: "Locations",
      })
    ).toBeInTheDocument();
  });
});
