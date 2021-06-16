import React, { useCallback, useMemo } from "react";

import {
  FlatList,
  StatusBar,
  StyleSheet,
  ListRenderItemInfo,
  ViewToken,
} from "react-native";

import map from "lodash/map";
import uniqBy from "lodash/uniqBy";
import flatMap from "lodash/flatMap";

import { useInfiniteQuery } from "react-query";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Chip } from "react-native-paper";

import PostCard from "../../components/PostCard";

import { useState } from "react";
import { api } from "../../lib/api";

type PostsResponse = {
  didEndOfList: NumberBoolean;
  dummyField: string;
  featuredAds: unknown[];
  targetedAdTags: unknown[];
  updateCount: number;
  posts: IPost[];
  group?: IGroup;
};

const PostsList = ({ params }: { params: IPostQueryParams }) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const queryResult = useInfiniteQuery(
    [
      "post-list",
      {
        params: {
          ...params,
          itemCount: 9,
          entryTypes: ["animated", "photo", "video", "article"].join(","),
        },
      },
    ] as const,
    ({ pageParam: olderThan, queryKey: [, { params: queryParams }] }) =>
      api.v2
        .get<APIResponse<PostsResponse>>(`/post-list`, {
          params: { ...queryParams, olderThan },
        })
        .then(({ data }) => data.data),
    {
      getNextPageParam: (lastPage) => map(lastPage?.posts, "id").join(","),
    },
  );

  const {
    data: queryData,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = queryResult;

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const tags = queryData?.pages?.[0]?.group?.featuredTags;

  const data = useMemo(
    () =>
      uniqBy(
        flatMap(queryData?.pages, (page) => page.posts),
        "id",
      ),
    [queryData],
  );

  const renderItem = useCallback(
    ({ item: post, index }: ListRenderItemInfo<IPost>) => {
      return <PostCard post={post} autoPlay={index === visibleIndex} />;
    },
    [visibleIndex],
  );

  const renderListHeader = useCallback(() => {
    if (!(Array.isArray(tags) && tags.length > 0)) {
      return null;
    }

    return (
      <FlatList
        data={tags}
        horizontal
        style={{ backgroundColor: "#222222" }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
        bounces={false}
        overScrollMode="never"
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Chip
            style={{
              marginRight: 6,
              borderRadius: 5,
              backgroundColor: "#050505",
            }}
            textStyle={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 14,
              marginVertical: 2,
              marginHorizontal: 0,
            }}
            onPress={() => console.log("OK")}
          >
            {item.key}
          </Chip>
        )}
        keyExtractor={({ key }) => key}
      />
    );
  }, [tags]);

  const renderListFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return <ActivityIndicator size="small" style={{ paddingVertical: 16 }} />;
  }, [isFetchingNextPage]);

  const onEndReached = useCallback(() => {
    if (!hasNextPage) {
      return;
    }

    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onViewableItemsChanged = useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      if (viewableItems && viewableItems.length > 0) {
        setVisibleIndex(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <>
      <StatusBar backgroundColor="#222222" />
      <FlatList
        scrollEventThrottle={16}
        refreshing={isFetching}
        onRefresh={refetch}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={({ id }) => `${id}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
        // onViewableItemsChanged={onViewableItemsChanged}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        initialNumToRender={4}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111111" },
  contentContainer: { flexGrow: 1 },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default PostsList;
