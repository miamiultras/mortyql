import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

import { Characters, GET_CHARACTERS_QUERY, Character } from "./characters";

const characterMock: Character = {
  name: "Rick",
  status: "Alive",
  species: "Human",
  type: "N/A",
  gender: "Male",
  image: "imgSrc",
};

const mocks = [
  {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: {
        searchQuery: "",
      },
    },
    result: {
      data: {
        characters: {
          results: [characterMock],
        },
      },
    },
  },
];

test("renders without error", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByText("Characters")).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "search" })).toBeInTheDocument();
});

test("renders character list", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(screen.getByTestId("spinner"));
  await new Promise((resolve) => setTimeout(resolve, 0));

  for (const key in characterMock) {
    if (key === "image") return;
    expect(
      screen.getByText(characterMock[key as keyof Character])
    ).toBeInTheDocument();
  }
});

test("renders error", async () => {
  const errorMock = {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: { name: "Rick" },
    },
    error: new Error("An error occurred"),
  };
  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(screen.getByTestId("spinner"));
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
});
