import { render, RenderAPI } from "@testing-library/react-native";
import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import Toast from "react-native-toast-message";

import { DarkTheme } from "theme/DarkTheme";
import { GenreContext } from "contexts/GenreContext/GenreContext";

import { genreDataFixture } from "./fixtures/genreFixture";

export const renderWithContext = (children: ReactNode): RenderAPI =>
  render(
    <GenreContext.Provider value={genreDataFixture.genres}>
      <ThemeProvider theme={DarkTheme}>
        {children}
        <Toast ref={ref => Toast.setRef(ref)} />
      </ThemeProvider>
    </GenreContext.Provider>
  );
