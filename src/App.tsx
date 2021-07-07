import React from "react";
import { ThemeProvider } from "styled-components";

import AppNavigation from "navigation/AppNavigation";
import { DarkTheme } from "theme/DarkTheme";

const App = (): JSX.Element => (
  <ThemeProvider theme={DarkTheme}>
    <AppNavigation />
  </ThemeProvider>
);

export default App;
