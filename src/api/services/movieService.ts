import { getJSON } from "api/apiCall";
import { MoviesData } from "types";

export const fetchUpcomingMovies = (page: number): Promise<MoviesData> =>
  getJSON<MoviesData>({
    url: `movie/upcoming?page=${page}`
  });
