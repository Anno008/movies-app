import React, { useState } from "react";

import { Grid, TextInput } from "components/atoms";
import MovieList from "components/MovieList";
import { useMoviesResponseHandler } from "hooks/useMoviesResponseHandler";
import { setTestId } from "testUtils/setTestId";
import locators from "testUtils/locators";

const MoviesSearchScreen = (): JSX.Element => {
  const [searchCriteria, setSearchCriteria] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useMoviesResponseHandler(
    page,
    true,
    searchCriteria
  );

  return (
    <Grid flexStretch="1">
      <TextInput
        margin={10}
        borderRadius="10px"
        value={searchCriteria}
        {...setTestId(locators.searchMoviesTextInput)}
        onChangeText={t => {
          setSearchCriteria(t);
          setPage(1);
        }}
        clearButtonMode="always"
      />
      <MovieList
        data={data?.results}
        onRefresh={() => setPage(1)}
        refreshing={loading}
        onEndReached={() => {
          if (data?.page === data?.total_pages) {
            return;
          }
          setPage(prev => ++prev);
        }}
      />
    </Grid>
  );
};
export default MoviesSearchScreen;
