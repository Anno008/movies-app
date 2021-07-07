import React from "react";
import { useTheme } from "styled-components";
import { Dimensions } from "react-native";

import {
  Grid,
  TouchableOpacity,
  Typography,
  ImageBackground
} from "components/atoms";
import { Movie } from "types";
import { imageEndpoint } from "constants/config";
import { setTestId } from "testUtils/setTestId";
import locators from "testUtils/locators";

const MovieCard = (movie: Movie): JSX.Element => {
  const theme = useTheme();
  const imageWidth = Math.ceil(Dimensions.get("window").width / 100) * 100;

  return (
    <TouchableOpacity
      margin={10}
      borderRadius="10px"
      border={`1px solid ${theme.secondaryBackgroundColor}`}
      overflow="hidden">
      <ImageBackground
        elWidth="100%"
        height={200}
        {...setTestId(locators.movieCardImage)}
        alignItems="flex-start"
        justifyContent="flex-start"
        source={{
          uri: `${imageEndpoint}w${imageWidth}/${
            movie.backdrop_path || movie.poster_path
          }`
        }}>
        <Grid
          margin={10}
          backgroundColor="transparent"
          flexStretch="1"
          justifyContent="space-between">
          <Typography bold fontSize="20px">
            {movie.title}
          </Typography>
          <Typography bold fontSize="20px">
            Rating: {movie.vote_average} / 10
          </Typography>
        </Grid>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default MovieCard;
