import React from "react";
import { Dimensions, Platform } from "react-native";

import { FAB } from "react-native-paper";

import map from "lodash/map";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs";

import PostsScreen from "../Posts";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";

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

export type NavigationProps = {
  route: RouteProp<{ Home: { group?: string } }, "Home">;
  navigation: HomeTabNavigationProp;
};

const HomeScreen = () => {
  const { params } = useRoute<NavigationProps["route"]>();

  const queryClient = useQueryClient();

  useQuery<APIResponse<{ dummyField: string; groups: IGroup[] }>>(
    ["group-list"],
    {
      onSuccess: (responseData) => {
        map(responseData?.data?.groups, (group) => {
          queryClient.setQueryData([`group/${group.id}`], group);
        });
      },
    },
  );

  const { data: groupData } = useQuery<IGroup | undefined>(
    [`group/${params?.group}`],
    ({ queryKey }) => queryClient.getQueryData(queryKey),
    {
      enabled: !!params?.group,
    },
  );

  const listTypes = groupData?.listTypes ?? [
    "hot",
    "trending",
    "fresh",
    "board",
  ];

  return (
    <>
      <TopTab.Navigator
        tabBarOptions={tabBarOptions}
        lazy
        lazyPreloadDistance={0}
        initialLayout={{
          width,
        }}
        initialRouteName={groupData?.listType}
        removeClippedSubviews={Platform.OS === "android"}
      >
        {listTypes.map((type) => (
          <TopTab.Screen
            name={type}
            component={PostsScreen}
            initialParams={{ group: params?.group ?? "1", type }}
          />
        ))}
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

export default HomeScreen;
