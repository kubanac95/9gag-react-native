import React, { useMemo } from "react";

import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import flatMapDeep from "lodash/flatMapDeep";

import { useInfiniteQuery } from "react-query";

import Comment from "../../components/Comment";

import { comment } from "../../lib/api";
import { useCallback } from "react";

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
    prev: string | null;
    next: string | null;
  };
};

// https://api.9gag.com/v2/post?entryIds=a3EerN1&entryTypes=animated%2Cphoto%2Cvideo%2Carticle
// https://comment-cdn.9gag.com/v2/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url=http%3A%2F%2F9gag.com%2Fgag%2FajmWZzQ&count=10&type=hot&level=1

type CommentsFlatListProps = {
  params: {
    url: string;
    level: 1 | 2;
    count?: number;
    type?: "hot" | "new";
    commentId?: string;
  };
};

const CommentsFlatList = (props: CommentsFlatListProps) => {
  const { params } = props;

  const {
    data: results,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [
      "cacheable/comment-list.json",
      {
        params,
      },
    ] as const,
    ({ pageParam: queryString, queryKey: [, { params: queryParams }] }) => {
      if (!queryString) {
        return comment.v2
          .get<CommentsResponse>(`/cacheable/comment-list.json`, {
            params: queryParams,
          })
          .then(({ data }) => data.payload);
      }

      return comment.v2
        .get<CommentsResponse>(`/cacheable/comment-list.json?${queryString}`)
        .then(({ data }) => data.payload);
    },
    {
      getNextPageParam: ({ next }) => next,
    },
  );

  const data = useMemo(
    () => flatMapDeep(results?.pages, ({ comments }) => comments),
    [results],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TComment>) => {
      return <Comment comment={item} url={params.url} />;
    },
    [params.url],
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const onEndReached = useCallback(() => {
    if (isFetchingNextPage) {
      return;
    }

    if (!hasNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshing={isFetching && !isFetchingNextPage}
      onRefresh={onRefresh}
      data={data}
      keyExtractor={({ commentId }) => commentId}
      renderItem={renderItem}
      onEndReached={onEndReached}
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

export default CommentsFlatList;
