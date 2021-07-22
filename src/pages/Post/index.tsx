import React, { useMemo } from "react";

import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import flatMapDeep from "lodash/flatMapDeep";

import { IconButton } from "react-native-paper";
import { useInfiniteQuery } from "react-query";

import Text from "../../components/Text";
import Comment from "../../components/Comment";
import PostCard from "../../components/PostCard";

import { comment } from "../../lib/api";
import { useCallback } from "react";

export type NavigationProps = {
  route: RouteProp<RootStackParamList, "Post">;
  navigation: StackNavigationProp<RootStackParamList, "Post">;
};

type CommentsResponse = {
  status: string;
  error: string;
  payload: {
    url: string;
    status: string;
    lock: boolean;
    total: number;
    opUserId: string;
    comments: TComment[];
  };
};

const HeaderRight = () => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon="bookmark-outline"
          color="#808080"
          onPress={console.log}
        />
        <IconButton
          icon="dots-vertical"
          color="#808080"
          onPress={console.log}
        />
      </View>
    </View>
  );
};

const headerRight = () => <HeaderRight />;

// https://api.9gag.com/v2/post?entryIds=a3EerN1&entryTypes=animated%2Cphoto%2Cvideo%2Carticle
// https://comment-cdn.9gag.com/v2/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url=http%3A%2F%2F9gag.com%2Fgag%2FajmWZzQ&count=10&type=hot&level=1

const PostPage = () => {
  const { params } = useRoute();

  const queryResult = useInfiniteQuery(
    [
      "cacheable/comment-list.json",
      {
        params: {
          ...params,
          type: "hot",
          level: 1,
          count: 10,
        },
      },
    ] as const,
    ({ pageParam: olderThan, queryKey: [, { params: queryParams }] }) =>
      comment.v2
        .get<CommentsResponse>(`/cacheable/comment-list.json`, {
          params: { ...queryParams, olderThan },
        })
        .then(({ data }) => data.payload),
    {
      getNextPageParam: () => undefined,
    },
  );

  const data = useMemo(
    () => flatMapDeep(queryResult?.data?.pages, ({ comments }) => comments),
    [queryResult],
  );

  const renderItem = useCallback(({ item }: ListRenderItemInfo<TComment>) => {
    return <Comment comment={item} />;
  }, []);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshing={queryResult.isFetching && !queryResult.isFetchingNextPage}
      onRefresh={queryResult.refetch}
      data={data}
      keyExtractor={({ commentId }) => commentId}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const navigationOptions: StackNavigationOptions = {
  headerRight,
};

PostPage.navigationOptions = navigationOptions;

export default PostPage;
