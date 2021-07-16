import React from "react";
import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { moviesDataFixture } from "testUtils/fixtures/moviesDataFixture";
import { movieFixture1 } from "testUtils/fixtures/movieFixture";
import { renderWithContext } from "testUtils/renderWithContext";
import locators from "testUtils/locators";

import MoviesSearchScreen from "../MoviesSearchScreen";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockedNavigate
  })
}));

const mockSearchMovies = jest.fn();
jest.mock("api/services/movieService", () => ({
  searchMovies: (page: number, query: string) => mockSearchMovies(page, query)
}));

describe("MoviesSearchScreen tests", () => {
  beforeEach(() => {
    mockSearchMovies.mockClear();
    mockSearchMovies.mockImplementation(() =>
      Promise.resolve(moviesDataFixture)
    );
  });
  it("Should not call searchMovies on mount", async () => {
    renderWithContext(<MoviesSearchScreen />);

    await waitFor(() => {
      expect(mockSearchMovies).not.toHaveBeenCalled();
    });
  });

  it("Should call searchMovies on text input", async () => {
    const text = "F";
    const { findByText, getByTestId } = renderWithContext(
      <MoviesSearchScreen />
    );

    const textInput = getByTestId(locators.searchMoviesTextInput);
    fireEvent.changeText(textInput, text);

    const movieTitle = await findByText(movieFixture1.title);

    expect(movieTitle).toBeDefined();
    expect(mockSearchMovies).toHaveBeenCalledWith(1, text);
  });

  it("Should call searchMovies on pull to refresh", async () => {
    const { getByTestId, findByTestId } = renderWithContext(
      <MoviesSearchScreen />
    );
    const textInput = getByTestId(locators.searchMoviesTextInput);
    fireEvent.changeText(textInput, "test");

    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onRefresh");
    });

    expect(mockSearchMovies).toHaveBeenCalledTimes(1);
    expect(mockSearchMovies).toHaveBeenNthCalledWith(1, 1, "test");
  });

  it("Should call searchMovies when end of the list is reached", async () => {
    const text = "test";
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
    mockSearchMovies
      .mockImplementationOnce(() => Promise.resolve(getMockedData(1)))
      .mockImplementationOnce(() => Promise.resolve(getMockedData(2)));

    const { findByTestId, getByTestId } = renderWithContext(
      <MoviesSearchScreen />
    );
    const textInput = getByTestId(locators.searchMoviesTextInput);
    fireEvent.changeText(textInput, text);
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onEndReached");
    });

    expect(mockSearchMovies).toHaveBeenCalledTimes(2);
    expect(mockSearchMovies).toHaveBeenNthCalledWith(1, 1, text);
    expect(mockSearchMovies).toHaveBeenNthCalledWith(2, 2, text);
  });
  it("Should not call searchMovies when end of the list is reached and there are no more pages", async () => {
    const { findByTestId, getByTestId } = renderWithContext(
      <MoviesSearchScreen />
    );
    const textInput = getByTestId(locators.searchMoviesTextInput);
    fireEvent.changeText(textInput, "test");
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onEndReached");
    });

    expect(mockSearchMovies).toHaveBeenCalledTimes(1);
    expect(mockSearchMovies).toHaveBeenCalledWith(1, "test");
  });

  it("Should not call searchMovies when end of the list is reached and data is undefined", async () => {
    mockSearchMovies.mockImplementation(() => Promise.resolve(undefined));
    const { findByTestId, getByTestId } = renderWithContext(
      <MoviesSearchScreen />
    );
    const textInput = getByTestId(locators.searchMoviesTextInput);
    fireEvent.changeText(textInput, "test");
    await act(async () => {
      const flatList = await findByTestId(locators.moviesScreenList);
      fireEvent(flatList, "onEndReached");
    });

    expect(mockSearchMovies).toHaveBeenCalledTimes(1);
  });
});
