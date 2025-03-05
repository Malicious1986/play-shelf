import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import AddGameDialog from "./index";
import "@testing-library/jest-dom";
import { store } from "@/store/store";
import {
  AddGameDocument,
  GetGamesDocument,
  UploadImageDocument,
} from "@/graphql/types";
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));
const mocks = [
  {
    request: {
      query: AddGameDocument,
      variables: {
        addGameInput: {
          name: "Test Game",
          description: "Test Description",
          image: "./images/fallback.jpg",
          category: "",
          rating: 0,
        },
      },
    },
    result: {
      data: {
        addGame: {
          id: "1",
          name: "Test Game",
          description: "",
          image: "./images/fallback.jpg",
          category: "",
          rating: 0,
        },
      },
    },
  },
  {
    request: {
      query: UploadImageDocument,
      variables: {
        file: new File([""], "cropped-image.jpg", { type: "image/jpeg" }),
      },
    },
    result: {
      data: {
        uploadImage: "./images/uploaded.jpg",
      },
    },
  },
  {
    request: {
      query: GetGamesDocument,
      variables: {
        category: "All",
      },
    },
    result: {
      data: {
        games: [
          {
            id: "1",
            name: "Test Game",
            description: "Test Description",
            image: "./images/fallback.jpg",
            rating: 0,
            category: "All",
          },
        ],
      },
    },
  },
];

describe("AddGameDialog", () => {
  it("renders the AddGameDialog component", () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AddGameDialog />
        </MockedProvider>
      </Provider>
    );

    expect(screen.getByText("Add game")).toBeInTheDocument();
  });

  it("opens the dialog when the button is clicked", () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AddGameDialog />
        </MockedProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("Add game"));
    expect(screen.getByText("Add new game")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AddGameDialog />
        </MockedProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("Add game"));

    fireEvent.change(screen.getByPlaceholderText("Name of the game"), {
      target: { value: "Test Game" },
    });

    fireEvent.change(screen.getByPlaceholderText("Description of the game"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText("Add Game"));

    await waitFor(() => {
      expect(screen.queryByText("Add new game")).not.toBeInTheDocument();
    });
  });
});
