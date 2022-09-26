import React, { useState } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

import { FloatingButton, Grid } from "components/atoms";

import SearchIcon from "assets/searchIcon.png";
import MovieList from "components/MovieList";
import { setTestId } from "testUtils/setTestId";
import locators from "testUtils/locators";
import { useMoviesResponseHandler } from "hooks/useMoviesResponseHandler";
import { RootStackParamList } from "navigation/AppNavigation";

const MoviesScreen = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useMoviesResponseHandler(page);

  return (
    <Grid flexStretch="1">
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
      <FloatingButton
        onPress={() => navigation.navigate("MoviesSearch")}
        {...setTestId(locators.searchMoviesNavigationButton)}>
        <Image source={SearchIcon} />
      </FloatingButton>
    </Grid>
  );
};
export default MoviesScreen;
