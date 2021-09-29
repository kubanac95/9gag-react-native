import { useCallback, useMemo } from "react";

import { FlatListProps } from "react-native";
import { InfiniteData, InfiniteQueryObserverResult } from "react-query";

import flatMapDeep from "lodash/flatMapDeep";

export type ReturnType<T> = Pick<
  FlatListProps<T>,
  "data" | "onRefresh" | "onEndReached"
> & {
  refreshing: boolean;
  onRefresh: () => Promise<any>;
};

export type InputType<T, R> = {
  /**
   * Data returned by `useInfiniteQuery`
   */
  query: InfiniteQueryObserverResult<R>;

  /**
   * Method to normalize pages data returned by `useInfiniteQuery`
   */
  getPageData: (value: InfiniteData<R>["pages"][number]) => T[];
};

const useInfiniteFlatListProps = <T extends unknown, R extends unknown>(
  props: InputType<T, R>,
): ReturnType<T> => {
  const {
    getPageData,
    query: {
      data: queryData,
      refetch,
      fetchNextPage,
      isFetching,
      hasNextPage,
      isFetchingNextPage,
    },
  } = props;

  const data = useMemo(
    () => flatMapDeep(queryData?.pages, (pageData) => getPageData(pageData)),
    [getPageData, queryData],
  );

  const onEndReached = useCallback(() => {
    if (!hasNextPage) {
      return;
    }

    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    data,
    refreshing: isFetching && !isFetchingNextPage,
    onRefresh: () => refetch(),
    onEndReached,
  };
};

export default useInfiniteFlatListProps;
