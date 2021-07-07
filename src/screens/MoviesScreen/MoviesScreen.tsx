import React, { useEffect, useState } from "react";

import { fetchUpcomingMovies } from "api/services/movieService";
import { StyledFlatList } from "components/atoms";
import { MoviesData } from "types";
import MovieCard from "components/MovieCard";
import { setTestId } from "testUtils/setTestId";
import locators from "testUtils/locators";

const MoviesScreen = (): JSX.Element => {
  const [moviesData, setMoviesData] = useState<MoviesData>();
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setRefreshing(true);
    fetchUpcomingMovies(page)
      .then(md =>
        setMoviesData(prev => (page === 1 ? md : mergeResults(md, prev)))
      )
      .catch(e => console.log(e.message))
      .finally(() => {
        setRefreshing(false);
      });
  }, [page]);

  const mergeResults = (
    newData: MoviesData,
    previousData?: MoviesData
  ): MoviesData => ({
    ...newData,
    results: [
      ...(previousData?.results ? previousData?.results : []),
      ...newData.results
    ]
  });
  return (
    <StyledFlatList
      {...setTestId(locators.moviesScreenList)}
      data={moviesData?.results}
      onEndReachedThreshold={0.6}
      onRefresh={() => setPage(1)}
      refreshing={refreshing}
      onEndReached={() => {
        if (moviesData?.page === moviesData?.total_pages) {
          return;
        }
        setPage(prev => ++prev);
      }}
      renderItem={m => <MovieCard {...m.item} />}
    />
  );
};
export default MoviesScreen;
