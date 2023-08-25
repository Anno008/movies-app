import { FC, useContext } from "react";

import Icon from "react-native-vector-icons/Feather";

import { useTheme } from "styled-components";

import { AppThemeContext } from "contexts/AppTheme/AppThemeContext";
import { TouchableOpacity } from "components/atoms";

const ThemeSwitch: FC = () => {
  const { themeVariant, toggleTheme } = useContext(AppThemeContext);
  const theme = useTheme();

  const iconName = themeVariant === "dark" ? "sun" : "moon";
  return (
    <TouchableOpacity onPress={toggleTheme} marginHorizontal={10}>
      <Icon name={iconName} size={30} color={theme.primaryTextColor} />
    </TouchableOpacity>
  );
};

export default ThemeSwitch;
