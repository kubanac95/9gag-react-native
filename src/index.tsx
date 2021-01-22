import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { QueryClientProvider } from "./context/QueryClient";
import { DarkTheme } from "./config/theme";

import * as Pages from "./pages";

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
// const TopTab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Pages.Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Root = () => {
  return (
    <QueryClientProvider>
      <PaperProvider theme={DarkTheme}>
        <NavigationContainer theme={DarkTheme}>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default Root;
