import { getJSON } from "api/apiCall";
import { MovieDetails, MoviesData } from "types";

export const fetchUpcomingMovies = (page: number): Promise<MoviesData> =>
  getJSON<MoviesData>({
    url: `movie/upcoming?page=${page}`
  });

export const searchMovies = (
  page: number,
  query: string
): Promise<MoviesData> =>
  getJSON<MoviesData>({
    url: `search/movie?page=${page}&query=${query}`
  });

export const getMovieById = (id: number): Promise<MovieDetails> =>
  getJSON<MovieDetails>({
    url: `movie/${id}?`
  });
