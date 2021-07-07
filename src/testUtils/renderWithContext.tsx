import { render, RenderAPI } from "@testing-library/react-native";
import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { DarkTheme } from "theme/DarkTheme";

export const renderWithContext = (children: ReactNode): RenderAPI =>
  render(<ThemeProvider theme={DarkTheme}>{children}</ThemeProvider>);
