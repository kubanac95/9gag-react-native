import React, { useState } from "react";

import dayjs from "dayjs";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

import FastImage from "react-native-fast-image";

import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Text from "./Text";
import Icon from "./Icon";
import Link from "./Link";

type CommentProps = {
  style?: ViewProps["style"];
  comment: TComment;
};

const CommentMedia = ({
  image,
}: {
  image: ICommentUserMedia["attachments"][number];
}) => {
  const [width, setWidth] = useState<number>();

  const aspectRatio = image.data.image.height / image.data.image.width;

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, borderRadius: 5, overflow: "hidden" }}
    >
      {width && (
        <FastImage
          source={{
            uri: image?.data.image?.url,
          }}
          style={{
            // flex: 1,
            // height: Dimensions.get("window").width * aspectRatio,
            // width: Dimensions.get("window").width,
            width,
            height: width * aspectRatio,
          }}
          resizeMode="contain"
          // style={styles.avatarImage}
        />
      )}
    </View>
  );
};

const Comment = (props: CommentProps) => {
  const {
    style,
    comment,
    comment: { text, user, type },
  } = props;

  const { colors } = useTheme();

  const navigation = useNavigation();

  return (
    <Pressable style={[styles.container, style]}>
      <Pressable style={styles.avatar}>
        <FastImage
          source={{ uri: user.avatarUrl }}
          style={styles.avatarImage}
        />
      </Pressable>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.timestamp}>
            {dayjs.unix(comment.timestamp).fromNow(true)}
          </Text>
        </View>
        {!!(typeof text === "string" && !text.startsWith("http")) && (
          <Text parseEntities style={styles.text}>
            {text}
          </Text>
        )}
        {type === "userMedia" && (
          <CommentMedia
            image={(comment as ICommentUserMedia).attachments?.[0]}
          />
        )}
        <View style={{ flexDirection: "row" }}>
          <Link
            authenticated
            style={{
              padding: 6,
              paddingLeft: 0,
            }}
            hitSlop={{ left: 6 }}
          >
            <Text
              style={{ fontSize: 13, color: "#808080", fontWeight: "bold" }}
            >
              Reply
            </Text>
          </Link>
          <Link
            authenticated
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 6,
            }}
          >
            <Icon
              name="arrow-up-bold"
              color="#808080"
              size={16}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{ fontSize: 13, color: "#808080", fontWeight: "bold" }}
            >
              {comment.likeCount}
            </Text>
          </Link>
          <Link
            authenticated
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 6,
            }}
          >
            <Icon
              name="arrow-down-bold"
              color="#808080"
              size={16}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{ fontSize: 13, color: "#808080", fontWeight: "bold" }}
            >
              {comment.dislikeCount}
            </Text>
          </Link>
          <Link
            authenticated
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 6,
            }}
          >
            <Icon
              name="dots-horizontal"
              color="#808080"
              size={16}
              style={{ marginRight: 4 }}
            />
          </Link>
        </View>
        {!!comment.childrenTotal && (
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: -6,
            }}
            onPress={() => navigation.navigate("Thread")}
          >
            <Icon name="menu-down" color={colors.accent} size={20} />
            <Text
              style={{ color: colors.accent, fontSize: 13, fontWeight: "bold" }}
            >
              {`View ${comment.childrenTotal} reply`}
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  displayName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 4,
  },
  timestamp: {
    fontSize: 11,
    color: "#808080",
  },
  text: {
    fontSize: 13,
    color: "#ececec",
    lineHeight: 17,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    overflow: "hidden",
    marginRight: 8,
  },
  avatarImage: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default Comment;
