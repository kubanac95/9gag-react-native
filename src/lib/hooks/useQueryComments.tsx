import { useInfiniteQuery } from "react-query";

import { comment } from "../api";

// https://api.9gag.com/v2/post?entryIds=a3EerN1&entryTypes=animated%2Cphoto%2Cvideo%2Carticle
// https://comment-cdn.9gag.com/v2/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url=http%3A%2F%2F9gag.com%2Fgag%2FajmWZzQ&count=10&type=hot&level=1

const useInfiniteQueryComments = (params: any) => {
  return useInfiniteQuery(
    [
      "cacheable/comment-list.json",
      {
        params,
      },
    ] as const,
    ({ pageParam: queryString, queryKey: [, { params: queryParams }] }) => {
      if (!queryString) {
        return comment.v2
          .get<ICommentsResponse>(`/cacheable/comment-list.json`, {
            params: queryParams,
          })
          .then(({ data }) => data.payload);
      }

      return comment.v2
        .get<ICommentsResponse>(`/cacheable/comment-list.json?${queryString}`)
        .then(({ data }) => data.payload);
    },
    {
      getNextPageParam: ({ next }) => next,
    },
  );
};

export default useInfiniteQueryComments;
