import React from "react";
import { View, LogBox } from "react-native";

import { Provider as PaperProvider, IconButton, FAB } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs";

import { QueryClientProvider } from "./context/QueryClient";
import { HomeStackScreenNavigationProp } from "./context/Navigation";

import { DarkTheme } from "./config/theme";

import * as Pages from "./pages";

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const tabBarOptions: MaterialTopTabBarOptions = {
  activeTintColor: "#fff",
  inactiveTintColor: "#bdbdbd",
  labelStyle: {
    textTransform: "none",
    fontWeight: "bold",
  },
  indicatorStyle: {
    backgroundColor: "#fff",
  },
};

const HomeTabNavigator = () => {
  return (
    <>
      <TopTab.Navigator tabBarOptions={tabBarOptions}>
        <Stack.Screen name="Hot" component={Pages.Home} />
        <Stack.Screen name="Trending" component={Pages.Home} />
        <Stack.Screen name="Top" component={Pages.Home} />
        <Stack.Screen name="Fresh" component={Pages.Home} />
      </TopTab.Navigator>
      <FAB
        icon="plus"
        style={{ position: "absolute", margin: 16, bottom: 0, right: 0 }}
        onPress={() => null}
      />
    </>
  );
};

const HomeStackNavigator = () => {
  const { openDrawer } = useNavigation<HomeStackScreenNavigationProp>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          headerStyle: {
            elevation: 0,
          },
          headerLeft: () => (
            <IconButton icon="menu" color="#808080" onPress={openDrawer} />
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <IconButton icon="magnify" color="#808080" />
                <IconButton icon="bell" color="#808080" />
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeDrawerNavigator}
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
          <RootStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default Root;
