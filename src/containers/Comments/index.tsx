import React, { useCallback } from "react";

import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";

import Comment from "../../components/Comment";

import useInfiniteQueryComments from "../../lib/hooks/useQueryComments";
import useInfiniteFlatListProps from "../../lib/hooks/useInfiniteFlatListProps";

type CommentsFlatListProps = Pick<
  FlatListProps<ICommentsResponse>,
  "ListHeaderComponent"
> & {
  params: ICommentParams;
};

const CommentsFlatList = (props: CommentsFlatListProps) => {
  const { params, ...listProps } = props;

  const queryResult = useInfiniteQueryComments(params);

  const {
    data,
    onRefresh,
    refreshing,
    onEndReached,
  } = useInfiniteFlatListProps({
    query: queryResult,
    getPageData: ({ comments }) => comments,
  });

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TComment>) => {
      return <Comment comment={item} url={params.url} />;
    },
    [params.url],
  );

  return (
    <FlatList
      {...listProps}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshing={refreshing}
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
