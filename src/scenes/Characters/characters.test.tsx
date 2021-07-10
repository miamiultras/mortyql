import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

import {
  Characters,
  GET_CHARACTERS_QUERY,
  ICharacter,
} from "./characters.component";

const charactersMock: ICharacter[] = [
  {
    name: "Rick",
    status: "Alive",
    species: "Human",
    type: "N/A",
    gender: "Male",
    image: "imgSrc",
  },
  {
    name: "Summer",
    status: "Alive",
    species: "Human",
    type: "N/A",
    gender: "Female",
    image: "imgSrc",
  },
];

const mock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};
window.IntersectionObserver = mock as any;

const mocks = [
  {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: {
        page: 1,
        query: "",
      },
    },
    result: {
      data: {
        characters: {
          results: charactersMock,
          info: { count: 1 },
        },
      },
    },
  },
];

describe("Characters", () => {
  test("render without error", () => {
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

  test("render character list", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Characters />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText(charactersMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(charactersMock[1].name)).toBeInTheDocument();
  });

  test("render error", async () => {
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
});
