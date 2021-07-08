import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Toast from "react-native-toast-message";

import { useMoviesResponseHandler } from "hooks/useMoviesResponseHandler";
import { moviesDataFixture } from "testUtils/fixtures/moviesDataFixture";

const mockFetchUpcomingMovies = jest.fn();
const mockSearchMovies = jest.fn();
jest.mock("api/services/movieService", () => ({
  fetchUpcomingMovies: (page: number) => mockFetchUpcomingMovies(page),
  searchMovies: (page: number, query: string) => mockSearchMovies(page, query)
}));

interface TestComponentProps {
  page: number;
  search?: boolean;
  query?: string;
}

const TestComponent = ({ page, search, query }: TestComponentProps): null => {
  useMoviesResponseHandler(page, search, query);

  return null;
};

describe("useMoviesResponseHandler tests", () => {
  beforeEach(() => {
    mockFetchUpcomingMovies.mockClear();
    mockSearchMovies.mockClear();
  });
  it("Should call fetchUpcomingMovies if search is false", async () => {
    mockFetchUpcomingMovies.mockImplementation(() =>
      Promise.resolve(moviesDataFixture)
    );
    const page = 2;
    render(<TestComponent page={page} />);

    await waitFor(() => {
      expect(mockFetchUpcomingMovies).toHaveBeenCalledWith(page);
      expect(mockSearchMovies).not.toHaveBeenCalledWith();
    });
  });

  it("Should call searchMovies if search is true and query is defined", async () => {
    mockSearchMovies.mockImplementation(() =>
      Promise.resolve(moviesDataFixture)
    );
    const page = 2;
    const query = "movie title";
    render(<TestComponent page={page} search query={query} />);

    await waitFor(() => {
      expect(mockSearchMovies).toHaveBeenCalledWith(page, query);
      expect(mockFetchUpcomingMovies).not.toHaveBeenCalledWith();
    });
  });

  it("Should not call searchMovies if search is true and query is undefined", async () => {
    mockSearchMovies.mockImplementation(() =>
      Promise.resolve(moviesDataFixture)
    );
    const page = 2;
    render(<TestComponent page={page} search />);

    await waitFor(() => {
      expect(mockSearchMovies).not.toHaveBeenCalled();
      expect(mockFetchUpcomingMovies).not.toHaveBeenCalledWith();
    });
  });

  it("Should show error toast if fetchUpcomingMovies fails", async () => {
    const error = "new error";
    mockFetchUpcomingMovies.mockImplementation(() =>
      Promise.reject(new Error(error))
    );
    const toastSpy = jest.spyOn(Toast, "show");
    const page = 2;
    render(<TestComponent page={page} />);

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        text1: "Failed to fetch movies",
        text2: error,
        type: "error"
      });
    });
  });

  it("Should show error toast if mockSearchMovies fails", async () => {
    const error = "new error";
    mockSearchMovies.mockImplementation(() => Promise.reject(new Error(error)));
    const toastSpy = jest.spyOn(Toast, "show");
    const page = 2;
    render(<TestComponent page={page} search query="test" />);

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        text1: "Failed to fetch movies",
        text2: error,
        type: "error"
      });
    });
  });
});
