import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import { fetchUpcomingMovies, searchMovies } from "api/services/movieService";
import { MoviesData } from "types";
import { mergeMovieData } from "utils/mergeMovieData";

interface Result {
  data?: MoviesData;
  loading: boolean;
}

export const useMoviesResponseHandler = (
  page: number,
  search?: boolean,
  query?: string
): Result => {
  const [data, setData] = useState<MoviesData>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (search && !query) {
      setData(undefined);
    } else {
      setLoading(true);
      const fetchFn =
        search && query ? searchMovies(page, query) : fetchUpcomingMovies(page);
      fetchFn
        .then(md =>
          setData(prev => (page === 1 ? md : mergeMovieData(md, prev?.results)))
        )
        .catch(e =>
          Toast.show({
            type: "error",
            text1: "Failed to fetch movies",
            text2: e.message
          })
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page, query, search]);

  return {
    data,
    loading
  };
};
