import { createContext } from "react";
import { Appearance } from "react-native";

export type AppThemeVariants = "light" | "dark";
export type ThemeContextValue = {
  themeVariant: AppThemeVariants;
  toggleTheme: () => void;
};

const systemTheme = Appearance.getColorScheme();
const defaultTheme = systemTheme || "dark";

export const AppThemeContext = createContext<ThemeContextValue>({
  themeVariant: defaultTheme,
  toggleTheme: () => null
});
