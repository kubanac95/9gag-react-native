import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function getMediaDimensions(media: { width: number; height: number }) {
  const aspectRatio = width / media.width;

  return {
    width,
    height: media.height * aspectRatio,
  };
}

export default getMediaDimensions;
