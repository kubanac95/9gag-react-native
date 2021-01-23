import React from "react";

import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { Text, TouchableRipple, IconButton } from "react-native-paper";

import { useTheme } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  post: IPost;
}

const { width } = Dimensions.get("window");

function formatVotes(value: number) {
  return Math.abs(value) > 999
    ? // @ts-ignore
      Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + "K"
    : Math.sign(value) * Math.abs(value);
}

const PostCard = (props: Props) => {
  const { colors } = useTheme();
  const {
    post: {
      upVoteCount,
      downVoteCount,
      commentsCount,
      title,
      images: { image460 },
      postSection,
    },
  } = props;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <View style={styles.headerSection}>
          <Text>{postSection?.name}</Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton icon="bookmark-outline" color="#808080" size={16} />
          <IconButton icon="dots-horizontal" color="#808080" size={16} />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{ uri: image460?.url }}
        style={{ width, height: width / (16 / 9) }}
      />
      <View style={styles.footer}>
        <TouchableRipple style={styles.footerButton} onPress={() => null}>
          <View style={styles.footerButtonInner}>
            <Icon name="arrow-up-bold" style={styles.footerButtonIcon} />
            <Text style={styles.footerButtonText}>
              {formatVotes(upVoteCount)}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple style={styles.footerButton} onPress={() => null}>
          <View style={styles.footerButtonInner}>
            <Icon name="arrow-down-bold" style={styles.footerButtonIcon} />
            <Text style={styles.footerButtonText}>
              {formatVotes(downVoteCount)}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple style={styles.footerButton} onPress={() => null}>
          <View style={styles.footerButtonInner}>
            <Icon
              name="comment"
              style={[styles.footerButtonIcon, { fontSize: 16 }]}
            />
            <Text style={styles.footerButtonText}>
              {formatVotes(commentsCount)}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple style={styles.footerButton} onPress={() => null}>
          <View style={styles.footerButtonInner}>
            <Icon
              name="share-variant"
              style={[styles.footerButtonIcon, { fontSize: 16 }]}
            />
            <Text style={styles.footerButtonText}>Share</Text>
          </View>
        </TouchableRipple>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderBottomColor: "#333333",
    borderBottomWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
  },
  headerSection: {},
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginHorizontal: 14,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  footerButtonText: {
    textTransform: "uppercase",
    color: "#808080",
    fontSize: 12,
    fontWeight: "bold",
  },
  footerButtonIcon: {
    color: "#808080",
    fontSize: 24,
    marginRight: 6,
  },
  footerButtonInner: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostCard;
