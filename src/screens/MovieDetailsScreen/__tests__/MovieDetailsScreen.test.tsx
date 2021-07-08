import { waitFor } from "@testing-library/react-native";
import React from "react";
import Toast from "react-native-toast-message";

import { movieDetailsFixture } from "testUtils/fixtures/movieDetailsFixture";

import { movieFixture1 } from "testUtils/fixtures/movieFixture";
import { renderWithContext } from "testUtils/renderWithContext";

import MovieDetailsScreen from "../MovieDetailsScreen";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      id: 5
    }
  })
}));

const mockGetMovieById = jest.fn();
jest.mock("api/services/movieService", () => ({
  getMovieById: (id: number) => mockGetMovieById(id)
}));
describe("MovieDetailsScreen tests", () => {
  beforeEach(() => {
    mockGetMovieById.mockClear();
  });

  it("Should display fetch and display movie details", async () => {
    mockGetMovieById.mockImplementation(() =>
      Promise.resolve(movieDetailsFixture)
    );
    const { findByText } = renderWithContext(<MovieDetailsScreen />);

    const title = await findByText(movieFixture1.title);

    expect(title).toBeDefined();
    expect(mockGetMovieById).toHaveBeenCalledWith(5);
  });

  it("Should show toast on error", async () => {
    const error = "An error happened";
    mockGetMovieById.mockImplementation(() => Promise.reject(new Error(error)));
    renderWithContext(<MovieDetailsScreen />);
    const toastSpy = jest.spyOn(Toast, "show");

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        text1: "Failed to acquire movie details",
        text2: error,
        type: "error"
      });
    });
  });
});
