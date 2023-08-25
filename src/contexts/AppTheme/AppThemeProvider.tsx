import { FC, PropsWithChildren, useState } from "react";
import { Appearance } from "react-native";
import { ThemeProvider } from "styled-components";
import * as StyledComponents from "styled-components";

import { DarkTheme } from "theme/DarkTheme";
import { LightTheme } from "theme/LightTheme";

import { AppThemeContext, AppThemeVariants } from "./AppThemeContext";

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const themes: Record<AppThemeVariants, StyledComponents.DefaultTheme> = {
    light: LightTheme,
    dark: DarkTheme
  };

  const systemTheme = Appearance.getColorScheme();

  const [themeVariant, setThemeVariant] = useState<AppThemeVariants>(
    () => systemTheme || "dark"
  );

  const handleToggleTheme = () => {
    setThemeVariant(themeVariant === "dark" ? "light" : "dark");
  };

  return (
    <AppThemeContext.Provider
      value={{
        themeVariant,
        toggleTheme: handleToggleTheme
      }}>
      <ThemeProvider theme={themes[themeVariant]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};
