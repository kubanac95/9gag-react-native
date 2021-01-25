import React, { useCallback, useMemo } from "react";

import {
  FlatList,
  StatusBar,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";

import flatMap from "lodash/flatMap";
import uniqBy from "lodash/uniqBy";

import { useInfiniteQuery } from "react-query";
import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Chip } from "react-native-paper";

import { HomeStackParamList } from "../../context/Navigation";
import PostCard from "../../components/PostCard";

import { api } from "../../lib/api";

const HomePage = () => {
  const { params } = useRoute<RouteProp<HomeStackParamList, "Home">>();

  const {
    data: queryData,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    ["posts", params],
    ({ pageParam: cursor, queryKey: [, { group, type }] }) =>
      api
        .get<
          APIResponse<{
            posts: IPost[];
            tags?: IPostTag[];
            nextCursor: string;
            featuredAds: any[];
          }>
        >(`/group-posts/group/${group}/type/${type}?${cursor}`)
        .then(({ data }) => data.data),
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    },
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const tags = queryData?.pages?.[0]?.tags ?? [];

  const data = useMemo(
    () =>
      uniqBy(
        flatMap(queryData?.pages, (page) => page.posts),
        "id",
      ),
    [queryData],
  );

  const renderItem = useCallback(
    ({ item: post }: ListRenderItemInfo<IPost>) => {
      return <PostCard post={post} />;
    },
    [],
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

  return (
    <>
      <StatusBar backgroundColor="#222222" />
      <FlatList
        refreshing={isFetching}
        onRefresh={refetch}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={({ id }) => `${id}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
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

export default HomePage;
