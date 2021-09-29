import React from "react";

import { FlatList, StyleSheet } from "react-native";

import { Chip } from "react-native-paper";

type TagProps = {
  onPress?: () => void;
};

const Tag: React.FC<TagProps> = (props) => {
  const { onPress, children } = props;

  return (
    <Chip
      style={styles.tagContainer}
      textStyle={styles.tagText}
      onPress={onPress}
    >
      {children}
    </Chip>
  );
};

type Props = {
  data?: IGroupFeatureTag[];
};

const PostsScreen = (props: Props) => {
  const { data } = props;

  return (
    <FlatList
      data={data}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      bounces={false}
      overScrollMode="never"
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Tag onPress={() => console.log("OK")}>{item.key}</Tag>
      )}
      keyExtractor={({ key }) => key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222222",
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagContainer: {
    marginRight: 6,
    borderRadius: 5,
    backgroundColor: "#050505",
  },
  tagText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginVertical: 2,
    marginHorizontal: 0,
  },
});

export default PostsScreen;
