import React, { FC, useContext } from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

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
import { deviceWidth } from "device/getSize";
import { GenreContext } from "contexts/GenreContext/GenreContext";
import { RootStackParamList } from "navigation/AppNavigation";

const MovieCard: FC<Movie> = ({
  id,
  title,
  release_date,
  backdrop_path,
  genre_ids,
  poster_path
}) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const genres = useContext(GenreContext);
  const imageWidth = Math.ceil(deviceWidth / 100) * 100;
  const combinedGenreNames = genres
    .filter(genre => genre_ids.includes(genre.id))
    .map(x => x.name)
    .join(", ");

  return (
    <TouchableOpacity
      marginVertical={10}
      borderRadius="10px"
      {...setTestId(`${locators.movieCardContainer}-${id}`)}
      onPress={() =>
        navigate("MovieDetails", {
          id
        })
      }
      border={`1px solid ${theme.secondaryBackgroundColor}`}
      overflow="hidden">
      <ImageBackground
        height={200}
        {...setTestId(locators.movieCardImage)}
        source={{
          uri: `${imageEndpoint}w${imageWidth}/${backdrop_path || poster_path}`
        }}>
        <Grid
          margin={10}
          backgroundColor="transparent"
          flexStretch="1"
          justifyContent="space-between">
          <Grid backgroundColor="transparent">
            <Typography bold fontSize="20px" applyTextShadow>
              {title}
            </Typography>
            <Typography fontSize="16px" applyTextShadow>
              {combinedGenreNames}
            </Typography>
          </Grid>
          <Typography bold fontSize="20px" alignSelf="flex-end" applyTextShadow>
            {release_date}
          </Typography>
        </Grid>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default MovieCard;
