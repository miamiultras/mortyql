import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

import { Episodes, GET_EPISODES_QUERY, Episode } from "./episodes.component";

const episodeMock: Episode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
};

const mocks = [
  {
    request: {
      query: GET_EPISODES_QUERY,
    },
    result: {
      data: {
        episodesById: {
          results: [episodeMock],
        },
      },
    },
  },
];

describe("Episodes", () => {
  test("render without error", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Episodes />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(
      screen.getByRole("heading", { name: "List of episodes" })
    ).toBeInTheDocument();
  });

  test("render episodes list", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Episodes />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    for (const key in episodeMock) {
      if (key === "id") return;
      expect(
        screen.getByText(episodeMock[key as keyof Episode])
      ).toBeInTheDocument();
    }
  });

  test("render error", async () => {
    const errorMock = {
      request: {
        query: GET_EPISODES_QUERY,
      },
      error: new Error("An error occurred"),
    };
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <Episodes />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});
