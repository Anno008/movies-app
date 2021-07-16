import { MoviesData } from "types";

import {
  movieFixture1,
  movieFixture2,
  movieFixture3,
  movieFixture4
} from "./movieFixture";

export const moviesDataFixture: MoviesData = {
  page: 1,
  results: [movieFixture1, movieFixture2, movieFixture3, movieFixture4],
  total_pages: 1,
  total_results: 4,
  dates: {
    maximum: "2021-07-30",
    minimum: "2021-07-05"
  }
};
