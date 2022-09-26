import React from "react";
import { ThemeProvider } from "styled-components";
import Toast from "react-native-toast-message";

import GenreProvider from "contexts/GenreContext/GenreProvider";
import { DarkTheme } from "theme/DarkTheme";
import AppNavigation from "navigation/AppNavigation";

// Bootstrapper
const App = (): JSX.Element => (
  <GenreProvider>
    <ThemeProvider theme={DarkTheme}>
      <AppNavigation />
      <Toast />
    </ThemeProvider>
  </GenreProvider>
);

export default App;
