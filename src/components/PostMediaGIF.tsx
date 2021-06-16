/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useCallback } from "react";

import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { AVPlaybackStatus, Video, VideoProps } from "expo-av";

import FastImage, { FastImageProps } from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import useSetState from "react-use/lib/useSetState";
import getMediaDimensions from "../lib/common/getMediaDimensions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const autoPlayGIF = true;

interface PostCardProps {
  width: number;
  height: number;

  source: VideoProps["source"];
  thumbnailSource?: FastImageProps["source"];

  autoPlay?: boolean;
}

type ControlState = "Show" | "Hidden";

type PlaybackState =
  | "Waiting"
  | "Loading"
  | "Playing"
  | "Paused"
  | "Buffering"
  | "Error";

const PostMediaVideo = React.forwardRef<never, PostCardProps>(
  ({ source, thumbnailSource, width, height }) => {
    const [playbackState, setPlaybackState] = useState<PlaybackState>(
      "Waiting",
    );

    const [state, setState] = useSetState({
      isLoaded: false,
      shouldPlay: false,
      isBuffering: false,
      initialize: false,
    });

    // useEffect(() => {
    //   if (
    //     autoPlay &&
    //     !state.shouldPlay &&
    //     !!((autoPlayGIF && isGIF) || (autoPlayVideo && !isGIF))
    //   ) {
    //     setState({ initialize: true });
    //   }

    //   if (!autoPlay && state.shouldPlay) {
    //     videoRef?.current?.setStatusAsync({ shouldPlay: false });
    //   }
    // }, [autoPlay, isGIF, setState, state.shouldPlay]);

    const videoRef = useRef<Video>(null);

    const onUpdatePlaybackState = useCallback(
      (nextPlaybackState: PlaybackState) => {
        if (playbackState === nextPlaybackState) {
          return;
        }

        console.log("nextPlaybackState", nextPlaybackState);

        setPlaybackState(nextPlaybackState);
      },
      [playbackState],
    );

    const onPlaybackStatusUpdate = useCallback(
      (status: AVPlaybackStatus) => {
        if (!status.isLoaded) {
          if (status.error) {
            onUpdatePlaybackState("Error");
          }

          return;
        }

        onUpdatePlaybackState(status.isPlaying ? "Playing" : "Paused");
      },
      [onUpdatePlaybackState],
    );

    const onPress = useCallback(() => {
      if (!state.initialize) {
        return setState({ initialize: true });
      }

      if (state.isLoaded) {
        return;
      }

      if (playbackState === "Playing") {
        return videoRef.current?.pauseAsync();
      } else {
        videoRef.current?.playAsync();
      }
    }, [playbackState, setState, state.initialize, state.isLoaded]);

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ backgroundColor: "#000" }}>
          {state.initialize && (
            <Video
              ref={videoRef}
              source={source}
              style={getMediaDimensions({ width, height })}
              resizeMode="contain"
              shouldPlay
              useNativeControls={false}
              isMuted
              isLooping
              volume={1.0}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            />
          )}

          {!!(thumbnailSource && !state.initialize) && (
            <FastImage
              source={thumbnailSource}
              style={getMediaDimensions({ width, height })}
              resizeMode="contain"
            />
          )}

          {playbackState !== "Playing" && (
            <View style={styles.absoluteCenter} pointerEvents="none">
              <View style={styles.overlayIcon}>
                <Icon name="gif" size={30} color="#fff" />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

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

export default PostMediaVideo;
