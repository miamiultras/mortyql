import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

import {
  Locations,
  GET_LOCATIONS_QUERY,
  Location,
} from "./locations.component";

const locationMock: Location = {
  id: 1,
  name: "Earth",
  type: "planet",
  dimension: "Test dimension",
};

const mocks = [
  {
    request: {
      query: GET_LOCATIONS_QUERY,
    },
    result: {
      data: {
        locations: {
          results: [locationMock],
        },
      },
    },
  },
];

describe("Locations", () => {
  test("render without error", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Locations />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(
      screen.getByRole("heading", { name: "List of locations" })
    ).toBeInTheDocument();
  });

  test("render location list", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Locations />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    for (const key in locationMock) {
      if (key === "id") return;
      expect(
        screen.getByText(locationMock[key as keyof Location])
      ).toBeInTheDocument();
    }
  });

  test("render error", async () => {
    const errorMock = {
      request: {
        query: GET_LOCATIONS_QUERY,
      },
      error: new Error("An error occurred"),
    };
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <Locations />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});
