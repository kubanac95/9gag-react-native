import React from "react";

import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useInfiniteQuery } from "react-query";

export type NavigationProps = {
  route: RouteProp<RootStackParamList, "Post">;
  navigation: StackNavigationProp<RootStackParamList, "Post">;
};

import { comment } from "../../lib/api";

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
        .get<{
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
        }>(`/cacheable/comment-list.json`, {
          params: { ...queryParams, olderThan },
        })
        .then(({ data }) => data.payload),
    {
      getNextPageParam: () => undefined,
    },
  );

  console.log(queryResult.data?.pages?.[0]?.comments);

  return null;
};

export default PostPage;
