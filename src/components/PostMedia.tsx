import React from "react";

import FastImage from "react-native-fast-image";

import PostMediaGIF from "./PostMediaGIF";
import PostMediaVideo from "./PostMediaVideo";

import getMediaDimensions from "../lib/common/getMediaDimensions";

const PostCard = ({ post }: { post: IPost }) => {
  switch (post.type) {
    case "Animated": {
      const {
        images: { image460sv, image460 },
      } = post;

      if (!image460sv.hasAudio) {
        return (
          <PostMediaGIF
            height={image460sv.height}
            width={image460sv.width}
            source={{ uri: image460sv.url }}
            thumbnailSource={{ uri: image460.url }}
          />
        );
      }

      return (
        <PostMediaVideo
          height={image460sv.height}
          width={image460sv.width}
          source={{ uri: image460sv.url }}
          thumbnailSource={{ uri: image460.url }}
        />
      );
    }

    case "Photo": {
      const {
        images: { image460 },
      } = post;

      return (
        <FastImage
          source={{ uri: image460.url }}
          style={[getMediaDimensions(image460)]}
          resizeMode="cover"
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default PostCard;
