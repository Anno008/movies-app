import { getJSON } from "api/apiCall";
import { GenreData } from "types";

export const fetchGenres = (): Promise<GenreData> =>
  getJSON<GenreData>({
    url: "genre/movie/list"
  });
