import React from "react";
import { View, LogBox } from "react-native";

import { Provider as PaperProvider, IconButton } from "react-native-paper";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { QueryClientProvider } from "./context/QueryClient";
import { HomeStackScreenNavigationProp } from "./context/Navigation";

import DrawerContent from "./components/DrawerContent";

import { DarkTheme } from "./config/theme";

import * as Pages from "./pages";

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {
  const { openDrawer } = useNavigation<HomeStackScreenNavigationProp>();

  const { params } = useRoute<any>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Pages.Home}
        initialParams={{ group: 1 }}
        options={{
          title: params?.title ?? "Home",
          headerStyle: {
            elevation: 0,
          },
          headerLeft: () => (
            <IconButton icon="menu" color="#808080" onPress={openDrawer} />
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon="magnify"
                  color="#808080"
                  onPress={console.log}
                />
                <IconButton icon="bell" color="#808080" onPress={console.log} />
                <IconButton
                  icon="account-circle"
                  color="#808080"
                  onPress={console.log}
                />
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
      <Stack.Screen
        name="Post"
        component={Pages.Post}
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
