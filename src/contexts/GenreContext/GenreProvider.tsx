import React, { ReactNode, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { fetchGenres } from "api/services/genresService";
import { Genre } from "types";

import { GenreContext } from "./GenreContext";

interface Props {
  children: ReactNode;
}
const GenreProvider = ({ children }: Props): JSX.Element => {
  const [genre, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres()
      .then(g => setGenres(g.genres || []))
      .catch(e =>
        Toast.show({
          type: "error",
          text1: "Failed to fetch genres",
          text2: e.message
        })
      );
  }, []);

  return (
    <GenreContext.Provider value={genre}>{children}</GenreContext.Provider>
  );
};

export default GenreProvider;
