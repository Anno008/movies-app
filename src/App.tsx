import React from "react";
import Toast from "react-native-toast-message";

import GenreProvider from "contexts/GenreContext/GenreProvider";
import AppNavigation from "navigation/AppNavigation";
import { AppThemeProvider } from "contexts/AppTheme/AppThemeProvider";

const App = (): JSX.Element => (
  <GenreProvider>
    <AppThemeProvider>
      <AppNavigation />
      <Toast />
    </AppThemeProvider>
  </GenreProvider>
);

export default App;
