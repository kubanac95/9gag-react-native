import React from "react";

import { StyleSheet, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import { IconButton } from "react-native-paper";

import CommentsFlatList from "../../containers/Comments";

export type NavigationProps = {
  route: RouteProp<RootStackParamList, "Post">;
  navigation: StackNavigationProp<RootStackParamList, "Post">;
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

const PostPage = () => {
  const { params } = useRoute<NavigationProps["route"]>();

  return (
    <CommentsFlatList
      params={{
        level: 1,
        type: "hot",
        url: params?.url,
        count: 10,
      }}
    />
  );
};

const styles = StyleSheet.create({});

const navigationOptions: StackNavigationOptions = {
  headerRight,
};

PostPage.navigationOptions = navigationOptions;

export default PostPage;
