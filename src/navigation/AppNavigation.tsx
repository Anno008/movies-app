import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components";

import MoviesScreen from "screens/MoviesScreen";
import MoviesSearchScreen from "screens/MoviesSearchScreen";
import MovieDetailsScreen from "screens/MovieDetailsScreen/MovieDetailsScreen";

const Stack = createStackNavigator();

const AppNavigation = (): JSX.Element => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false,
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
        <Stack.Screen
          name="MoviesSearch"
          component={MoviesSearchScreen}
          options={{ title: "Search movies" }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{ title: "Movie details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
