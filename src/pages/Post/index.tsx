import React, { useCallback } from "react";

import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import { IconButton } from "react-native-paper";

import PostCard from "../../components/PostCard";
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

  const renderListHeader = useCallback(() => {
    return <>{params.post && <PostCard post={params.post} />}</>;
  }, [params.post]);

  return (
    <>
      <CommentsFlatList
        ListHeaderComponent={renderListHeader}
        params={{
          level: 1,
          type: "hot",
          url: params?.url,
          count: 10,
        }}
      />
    </>
  );
};

const navigationOptions: StackNavigationOptions = {
  headerRight,
};

PostPage.navigationOptions = navigationOptions;

export default PostPage;
