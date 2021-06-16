/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState, useCallback } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";

import Slider from "@react-native-community/slider";

import { AVPlaybackStatus, Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";

import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import useSetState from "react-use/lib/useSetState";

const autoPlayGIF = true;
const autoPlayVideo = true;
const isMutedDefault = false;

interface PostCardProps {
  post: IPost;
  autoPlay?: boolean;
  onLayoutMedia?: (event: LayoutChangeEvent) => void;
}

type ControlState = "Show" | "Hidden";

type PlaybackState =
  | "Waiting"
  | "Loading"
  | "Playing"
  | "Paused"
  | "Buffering"
  | "Error";

const { width } = Dimensions.get("window");

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

const PostMediaVideo = React.forwardRef<never, PostCardProps>(
  ({ post, autoPlay }) => {
    const {
      images: { image460, image460sv },
    } = post;

    const isGIF = !image460sv.hasAudio;

    const isFocused = useIsFocused();

    const [isMuted, setIsMuted] = useState(isMutedDefault);

    const [sliderWidth, setSliderWidth] = useState(0);

    const [playbackState, setPlaybackState] = useState<PlaybackState>(
      "Waiting",
    );

    const [controlsState, setControlsState] = useState<ControlState>("Hidden");

    const [state, setState] = useSetState({
      isLoaded: false,
      shouldPlay: false,
      isBuffering: false,
      initialize: false,
    });

    const opacityValue = useRef(new Animated.Value(0)).current;

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

    useEffect(() => {
      Animated.timing(opacityValue, {
        toValue: controlsState === "Show" ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlsState]);

    const onSeekSliderValueChange = () => {};

    const onSeekSliderSlidingComplete = () => {};

    const onSeekBarTap = (e: GestureResponderEvent) => {
      if (
        !(
          playbackState === "Loading" ||
          playbackState === "Error" ||
          controlsState !== "Show"
        )
      ) {
        const value = e.nativeEvent.locationX / sliderWidth;
        // onSeekSliderValueChange();
        // onSeekSliderSlidingComplete(value);
      }
    };

    const onPress = useCallback(() => {
      if (!state.initialize) {
        return setState({ initialize: true });
      }

      if (state.isLoaded) {
        return;
      }

      return setControlsState(controlsState === "Show" ? "Hidden" : "Show");
      //
    }, [controlsState, setState, state.initialize, state.isLoaded]);

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ backgroundColor: "#000" }}>
          {state.initialize && (
            <Video
              ref={videoRef}
              source={{ uri: image460sv?.url }}
              style={getMediaDimensions(image460sv)}
              resizeMode="contain"
              shouldPlay={autoPlay && isFocused}
              isLooping
              useNativeControls={false}
              isMuted={isMuted}
              volume={1.0}
              onLoad={() => {
                if (autoPlay) {
                  videoRef.current?.setStatusAsync({ shouldPlay: true });
                }
              }}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            />
          )}

          {!state.initialize && (
            <FastImage
              source={{ uri: image460?.url }}
              style={getMediaDimensions(image460)}
              resizeMode="contain"
            />
          )}

          {/* Overlay until video is loaded */}
          {!state.initialize && (
            <View style={styles.absoluteCenter} pointerEvents="none">
              <View style={styles.overlayIcon}>
                <Icon
                  name={image460sv.hasAudio ? "play" : "gif"}
                  size={30}
                  color="#fff"
                />
              </View>
            </View>
          )}

          {state.initialize && (
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: opacityValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ]}
            >
              <Pressable
                style={styles.overlayIcon}
                onPress={() => {
                  if (controlsState === "Show" && playbackState !== "Playing") {
                    setControlsState("Hidden");
                  }
                  console.log(playbackState, playbackState !== "Playing");
                  return videoRef?.current?.setStatusAsync({
                    shouldPlay: playbackState !== "Playing",
                  });
                }}
              >
                <Icon
                  name={image460sv.hasAudio ? "play" : "gif"}
                  size={30}
                  color="#fff"
                />
              </Pressable>
            </Animated.View>
          )}

          {!isGIF && (
            <>
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                    justifyContent: "space-between",
                    opacity: opacityValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                <Text
                  style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}
                >
                  00:00
                </Text>
                <TouchableWithoutFeedback
                  onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
                  onPress={onSeekBarTap}
                >
                  <Slider
                    style={{ flex: 1, marginRight: 10, marginLeft: 10 }}
                    thumbTintColor="#fff"
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#fff"
                    value={0}
                    onValueChange={onSeekSliderValueChange}
                    onSlidingComplete={onSeekSliderSlidingComplete}
                    disabled={
                      playbackState === "Loading" ||
                      playbackState === "Error" ||
                      controlsState !== "Show"
                    }
                  />
                </TouchableWithoutFeedback>
                <Pressable
                  hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                  onPress={() => setIsMuted(!isMuted)}
                >
                  <Icon
                    name={isMuted ? "volume-off" : "volume-high"}
                    color="#fff"
                    size={18}
                  />
                </Pressable>
              </Animated.View>
            </>
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
