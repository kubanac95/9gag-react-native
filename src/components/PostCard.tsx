import React, { useState } from "react";

import dayjs from "dayjs";

import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";

import { Video } from "expo-av";
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

function getMediaDimensions(media: { width: number; height: number }) {
  const upscale = width > media.width;

  if (upscale) {
    const aspectRatio = width / media.width;

    return {
      width,
      height: media.height * aspectRatio,
    };
  }

  return {
    width: media.width,
    height: media.height,
  };
}

const PostMediaImage = ({ post }: Props) => {
  const {
    images: { image460 },
  } = post;

  return (
    <Image
      source={{ uri: image460?.url }}
      style={getMediaDimensions(image460)}
      resizeMethod="scale"
      resizeMode="contain"
    />
  );
};

const PostMediaVideo = ({ post }: Props) => {
  const {
    images: { image460sv },
  } = post;

  const [autoPlay, setAutoPlay] = useState(false);

  if (!autoPlay) {
    return (
      <Pressable onPress={() => setAutoPlay(true)}>
        <Image
          source={{ uri: image460sv?.url }}
          style={getMediaDimensions(image460sv)}
          resizeMethod="scale"
          resizeMode="contain"
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "rgba(0,0,0,0.75)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={image460sv.hasAudio ? "play" : "gif"}
              size={30}
              color="#fff"
            />
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Video
      source={{ uri: image460sv?.url }}
      style={getMediaDimensions(image460sv)}
      resizeMode="contain"
      shouldPlay
      isLooping
    />
  );
};

const PostMedia = ({ post }: Props) => {
  const { type } = post;

  if (type === "Photo") {
    return <PostMediaImage post={post} />;
  }

  if (post.type === "Animated") {
    return <PostMediaVideo post={post} />;
  }

  return null;
};

const PostCard = (props: Props) => {
  const { colors } = useTheme();

  const {
    post,
    post: {
      upVoteCount,
      downVoteCount,
      commentsCount,
      title,
      creationTs,
      postSection,
    },
  } = props;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.background }]}
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
      <Text style={styles.title}>{title}</Text>
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
    fontSize: 16,
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
