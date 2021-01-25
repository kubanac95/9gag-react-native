import React from "react";
import { View, LogBox, Dimensions, Platform } from "react-native";

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

import DrawerContent from "./components/DrawerContent";

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

const { width } = Dimensions.get("window");

const HomeTabNavigator = () => {
  return (
    <>
      <TopTab.Navigator
        tabBarOptions={tabBarOptions}
        lazy
        lazyPreloadDistance={1}
        initialLayout={{
          width,
        }}
        removeClippedSubviews={Platform.OS === "android"}
      >
        <Stack.Screen
          name="Hot"
          component={Pages.Home}
          initialParams={{ group: "default", type: "hot" }}
        />
        <Stack.Screen
          name="Trending"
          component={Pages.Home}
          initialParams={{ group: "default", type: "trending" }}
        />
        <Stack.Screen
          name="Top"
          component={Pages.Home}
          initialParams={{ group: "default", type: "top" }}
        />
        <Stack.Screen
          name="Fresh"
          component={Pages.Home}
          initialParams={{ group: "default", type: "fresh" }}
        />
      </TopTab.Navigator>
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          bottom: 0,
          right: 0,
          backgroundColor: "#0077ff",
        }}
        onPress={() => null}
        color="#fff"
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
                <IconButton icon="account-circle" color="#808080" />
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const NSFWTabNavigator = () => {
  return (
    <>
      <TopTab.Navigator
        tabBarOptions={tabBarOptions}
        lazy
        lazyPreloadDistance={1}
        initialLayout={{
          width,
        }}
        removeClippedSubviews={Platform.OS === "android"}
      >
        <Stack.Screen
          name="Hot"
          component={Pages.Home}
          initialParams={{ group: "nsfw", type: "hot" }}
        />
        <Stack.Screen
          name="Trending"
          component={Pages.Home}
          initialParams={{ group: "nsfw", type: "trending" }}
        />
        <Stack.Screen
          name="Top"
          component={Pages.Home}
          initialParams={{ group: "nsfw", type: "top" }}
        />
        <Stack.Screen
          name="Fresh"
          component={Pages.Home}
          initialParams={{ group: "nsfw", type: "fresh" }}
        />
      </TopTab.Navigator>
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          bottom: 0,
          right: 0,
          backgroundColor: "#0077ff",
        }}
        onPress={() => null}
        color="#fff"
      />
    </>
  );
};

const NSFWStackNavigator = () => {
  const { openDrawer } = useNavigation<HomeStackScreenNavigationProp>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NSFW"
        component={NSFWTabNavigator}
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
                <IconButton icon="account-circle" color="#808080" />
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
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="NSFW" component={NSFWStackNavigator} />
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
