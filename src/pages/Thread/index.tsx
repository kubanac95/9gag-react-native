import { RouteProp, useRoute } from "@react-navigation/core";
import {
  StackNavigationProp,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

import CommentsFlatList from "../../containers/Comments";

export type NavigationProps = {
  route: RouteProp<RootStackParamList, "Thread">;
  navigation: StackNavigationProp<RootStackParamList, "Thread">;
};

const ThreadPage = () => {
  const { params } = useRoute<NavigationProps["route"]>();

  return (
    <CommentsFlatList
      params={{
        level: 2,
        count: 10,
        url: params.url,
        commentId: params.commentId,
      }}
    />
  );
};

const HeaderRight = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <IconButton
        icon="bookmark-outline"
        color="#808080"
        onPress={console.log}
      />
      <IconButton icon="dots-vertical" color="#808080" onPress={console.log} />
    </View>
  );
};

const headerRight = () => <HeaderRight />;

const navigationOptions: StackNavigationOptions = {
  headerRight,
};

ThreadPage.navigationOptions = navigationOptions;

export default ThreadPage;
