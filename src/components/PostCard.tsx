import React from "react";

import {
  View,
  Image,
  Pressable,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";

import dayjs from "dayjs";

import { TouchableRipple, IconButton } from "react-native-paper";
import { useNavigation, useTheme } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Text from "./Text";
import PostMedia from "./PostMedia";

interface PostCardProps {
  post: IPost;
  autoPlay?: boolean;
  onLayoutMedia?: (event: LayoutChangeEvent) => void;
}

export interface PostCardRef {}

function formatVotes(value: number) {
  return Math.abs(value) > 999
    ? // @ts-ignore
      Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + "K"
    : Math.sign(value) * Math.abs(value);
}

const PostCard = React.forwardRef<unknown, PostCardProps>((props) => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const { post, onLayoutMedia } = props;

  const {
    upVoteCount,
    downVoteCount,
    commentsCount,
    title,
    creationTs,
    postSection,
  } = post;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.background }]}
      onLayout={onLayoutMedia}
    >
      <View style={styles.header}>
        <View style={styles.headerSection}>
          <Image
            source={{ uri: postSection.imageUrl }}
            style={styles.headerSectionImage}
          />
          <Text style={styles.headerSectionText}>
            {[postSection?.name, dayjs.unix(creationTs).fromNow(true)].join(
              " · ",
            )}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton icon="bookmark-outline" color="#808080" size={16} />
          <IconButton icon="dots-horizontal" color="#808080" size={16} />
        </View>
      </View>
      <Text style={styles.title} parseEntities>
        {title}
      </Text>

      <PostMedia post={post} />

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
        <TouchableRipple
          style={styles.footerButton}
          onPress={() => navigation.navigate("Post", { url: post.url })}
        >
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
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSectionImage: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  headerSectionText: {
    fontSize: 12,
    color: "#808080",
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
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
  absoluteCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostCard;
