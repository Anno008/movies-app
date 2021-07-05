import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MoviesScreen from "screens/MoviesScreen";

const Stack = createStackNavigator();

const AppNavigation = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={MoviesScreen}
        options={{ title: "Upcoming movies" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default AppNavigation;
