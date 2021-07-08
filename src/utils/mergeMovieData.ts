import { Movie, MoviesData } from "types";

export const mergeMovieData = (
  newData: MoviesData,
  previousMovies?: Movie[]
): MoviesData => ({
  ...newData,
  results: [...(previousMovies ? previousMovies : []), ...newData.results]
});
