import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Image, StyleSheet } from "react-native";

import { ScrollView, Typography } from "components/atoms";
import { MovieDetails } from "types";
import { getMovieById } from "api/services/movieService";
import { imageEndpoint } from "constants/config";
import { deviceWidth } from "device/getSize";

const scrollViewStyles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 10
  },
  style: {
    flex: 1
  }
});

type ParamList = {
  MovieDetails: {
    id: number;
  };
};
const MovieDetailsScreen = (): JSX.Element => {
  const {
    params: { id }
  } = useRoute<RouteProp<ParamList, "MovieDetails">>();

  const [movie, setMovie] = useState<MovieDetails>();
  const [combinedGenreNames, setCombinedGenreNames] = useState<string>();

  const imageWidth = Math.ceil(deviceWidth / 100) * 100;
  const imageHeight = Math.round((deviceWidth * 9) / 6);

  useEffect(() => {
    setCombinedGenreNames(movie?.genres.map(x => x.name).join(", "));
  }, [movie]);

  useEffect(() => {
    getMovieById(id)
      .then(setMovie)
      .catch(e =>
        Toast.show({
          type: "error",
          text1: "Failed to acquire movie details",
          text2: e.message
        })
      );
  }, [id]);
  return (
    <ScrollView
      style={scrollViewStyles.style}
      contentContainerStyle={scrollViewStyles.contentContainerStyle}>
      <Typography bold fontSize="20px">
        {movie?.title}
      </Typography>
      <Typography>{movie?.overview}</Typography>
      <Typography>{combinedGenreNames}</Typography>
      {movie?.poster_path && (
        <Image
          resizeMode="contain"
          style={{
            width: deviceWidth - 20,
            height: imageHeight
          }}
          source={{
            uri: `${imageEndpoint}w${imageWidth}/${movie.poster_path}`
          }}
        />
      )}
      <Typography>Release date: {movie?.release_date}</Typography>
      <Typography>Rating: {movie?.vote_average} / 10</Typography>
      <Typography>Votes: {movie?.vote_count}</Typography>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
