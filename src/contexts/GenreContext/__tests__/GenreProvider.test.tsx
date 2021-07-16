import { render, waitFor } from "@testing-library/react-native";
import React, { useContext } from "react";
import Toast from "react-native-toast-message";

import { Typography } from "components/atoms";
import {
  genreDataFixture,
  genreFixture1
} from "testUtils/fixtures/genreFixture";

import { GenreContext } from "../GenreContext";
import GenreProvider from "../GenreProvider";

const mockFetchGenres = jest.fn();
jest.mock("api/services/genresService", () => ({
  fetchGenres: () => mockFetchGenres()
}));

const TestComponent = (): JSX.Element => {
  const [first] = useContext(GenreContext);
  return (
    <Typography>{!!first && first.name ? first.name : "empty"}</Typography>
  );
};

describe("GenreProvider tests", () => {
  it("Should call fetch genres on mount and make the data available to children", async () => {
    mockFetchGenres.mockImplementation(() => Promise.resolve(genreDataFixture));
    const { findByText } = render(
      <GenreProvider>
        <TestComponent />
      </GenreProvider>
    );

    const first = await findByText(genreFixture1.name);

    expect(first).toBeDefined();
    expect(mockFetchGenres).toHaveBeenCalled();
  });

  it("Should call fetch genres on mount and set an empty array if the response is undefined", async () => {
    mockFetchGenres.mockImplementation(() =>
      Promise.resolve({ genres: undefined })
    );
    const { findByText } = render(
      <GenreProvider>
        <TestComponent />
      </GenreProvider>
    );

    const first = await findByText("empty");

    expect(first).toBeDefined();
    expect(mockFetchGenres).toHaveBeenCalled();
  });

  it("Should show toast on error", async () => {
    const error = "An error happened";
    mockFetchGenres.mockImplementation(() => Promise.reject(new Error(error)));
    const toastSpy = jest.spyOn(Toast, "show");

    render(
      <GenreProvider>
        <TestComponent />
      </GenreProvider>
    );

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        text1: "Failed to fetch genres",
        text2: error,
        type: "error"
      });
    });
  });
});
