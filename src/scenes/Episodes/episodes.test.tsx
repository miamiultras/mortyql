import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

import { Episodes, GET_EPISODES_QUERY, IEpisode } from "./episodes.component";

const episodeMockSeason1: IEpisode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
};

const episodeMockSeason2: IEpisode = {
  id: 2,
  name: "Pilot2",
  episode: "S02E01",
  air_date: "December 2, 2014",
};

const episodeMockSeason3: IEpisode = {
  id: 3,
  name: "Pilot3",
  episode: "S03E01",
  air_date: "December 2, 2015",
};

const episodeMockSeason4: IEpisode = {
  id: 4,
  name: "Pilot4",
  episode: "S04E01",
  air_date: "December 2, 2016",
};

const mocks = [
  {
    request: {
      query: GET_EPISODES_QUERY,
    },
    result: {
      data: {
        season1: [episodeMockSeason1],
        season2: [episodeMockSeason2],
        season3: [episodeMockSeason3],
        season4: [episodeMockSeason4],
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

    expect(screen.getByText(episodeMockSeason1.name)).toBeInTheDocument();
    expect(screen.getByText(episodeMockSeason1.episode)).toBeInTheDocument();
    expect(screen.getByText(episodeMockSeason1.air_date)).toBeInTheDocument();
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
