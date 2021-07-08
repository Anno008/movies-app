import React from "react";
import { act, fireEvent, waitFor } from "@testing-library/react-native";
import Toast from "react-native-toast-message";

import { moviesDataFixture } from "testUtils/fixtures/moviesDataFixture";
import { movieFixture1 } from "testUtils/fixtures/movieFixture";
import { renderWithContext } from "testUtils/renderWithContext";
import locators from "testUtils/locators";

import MoviesScreen from "../MoviesScreen";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockedNavigate
  })
}));

const mockFetchUpcomingMovies = jest.fn();
jest.mock("api/services/movieService", () => ({
  fetchUpcomingMovies: (page: number) => mockFetchUpcomingMovies(page)
}));

describe("MoviesScreen tests", () => {
  beforeEach(() => {
    mockFetchUpcomingMovies.mockClear();
    mockFetchUpcomingMovies.mockImplementation(() =>
      Promise.resolve(moviesDataFixture)
    );
  });
  it("Should call fetchUpcomingMovies on mount and display movies", async () => {
    const { findByText } = renderWithContext(<MoviesScreen />);
    const movieTitle = await findByText(movieFixture1.title);

    expect(movieTitle).toBeDefined();
    expect(mockFetchUpcomingMovies).toHaveBeenCalledWith(1);
  });

  it("Should call fetchUpcomingMovies on pull to refresh", async () => {
    const { findByTestId } = renderWithContext(<MoviesScreen />);
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onRefresh");
    });

    expect(mockFetchUpcomingMovies).toHaveBeenCalledTimes(1);
    expect(mockFetchUpcomingMovies).toHaveBeenNthCalledWith(1, 1);
  });

  it("Should call fetchUpcomingMovies when end of the list is reached", async () => {
    const getMockedData = (page: number) => ({
      ...moviesDataFixture,
      total_pages: 2,
      page,
      results: Array(10)
        .fill(undefined)
        .map((_item, index) => ({
          ...movieFixture1,
          id: movieFixture1.id + index
        }))
    });
    mockFetchUpcomingMovies
      .mockImplementationOnce(() => Promise.resolve(getMockedData(1)))
      .mockImplementationOnce(() => Promise.resolve(getMockedData(2)));

    const { findByTestId } = renderWithContext(<MoviesScreen />);
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onEndReached");
    });

    expect(mockFetchUpcomingMovies).toHaveBeenCalledTimes(2);
    expect(mockFetchUpcomingMovies).toHaveBeenNthCalledWith(1, 1);
    expect(mockFetchUpcomingMovies).toHaveBeenNthCalledWith(2, 2);
  });
  it("Should not call fetchUpcomingMovies when end of the list is reached and there are no more pages", async () => {
    const { findByTestId } = renderWithContext(<MoviesScreen />);
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onEndReached");
    });

    expect(mockFetchUpcomingMovies).toHaveBeenCalledTimes(1);
  });

  it("Should not call fetchUpcomingMovies when end of the list is reached and data is undefined", async () => {
    mockFetchUpcomingMovies.mockImplementation(() =>
      Promise.resolve(undefined)
    );
    const { findByTestId } = renderWithContext(<MoviesScreen />);
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onEndReached");
    });

    expect(mockFetchUpcomingMovies).toHaveBeenCalledTimes(1);
  });

  it("Should show toast on error", async () => {
    const error = "An error happened";
    mockFetchUpcomingMovies.mockImplementation(() =>
      Promise.reject(new Error(error))
    );

    const toastSpy = jest.spyOn(Toast, "show");
    renderWithContext(<MoviesScreen />);

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        text1: "Failed to fetch movies",
        text2: error,
        type: "error"
      });
    });
  });

  it("Should navigate to new screen on search button press", async () => {
    const { findByTestId } = renderWithContext(<MoviesScreen />);

    const navigateButton = await findByTestId(
      locators.searchMoviesNavigationButton
    );

    fireEvent.press(navigateButton);

    expect(mockedNavigate).toHaveBeenCalledWith("MoviesSearch");
  });
});
