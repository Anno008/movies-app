import React from "react";

import { StyledFlatList } from "components/atoms";

import locators from "testUtils/locators";
import { setTestId } from "testUtils/setTestId";
import MovieCard from "components/MovieCard";
import { Movie } from "types";

interface Props {
  data?: Movie[];
  onRefresh: () => void;
  refreshing: boolean;
  onEndReached: () => void;
}

const MovieList = ({
  data,
  onRefresh,
  refreshing,
  onEndReached
}: Props): JSX.Element => (
  <StyledFlatList
    {...setTestId(locators.moviesScreenList)}
    data={data}
    onEndReachedThreshold={0.6}
    onRefresh={onRefresh}
    refreshing={refreshing}
    onEndReached={onEndReached}
    renderItem={m => <MovieCard {...m.item} />}
  />
);

export default MovieList;
