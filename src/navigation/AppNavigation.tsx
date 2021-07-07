import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme } from "styled-components";

import MoviesScreen from "screens/MoviesScreen";

const Stack = createStackNavigator();

const AppNavigation = (): JSX.Element => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.secondaryBackgroundColor,
            elevation: 0,
            shadowOpacity: 0
          },
          headerTintColor: theme.primaryTextColor
        }}>
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{ title: "Upcoming movies" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
