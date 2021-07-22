import React, { useMemo } from "react";
import { Text as PaperText } from "react-native-paper";

import { parseEntities as parse } from "parse-entities";

type FontFamily =
  | "sans-serif"
  | "sans-serif-medium"
  | "sans-serif-light"
  | "sans-serif-thin";

export type Props = React.ComponentPropsWithoutRef<typeof PaperText> & {
  children?: React.ReactNode;
  parseEntities?: boolean;
  fontFamily?: FontFamily;
  fontWeight?: "medium" | "regular" | "light" | "thin";
};

export type Ref = React.ElementRef<typeof PaperText>;

const Text = React.forwardRef<Ref, Props>((props, ref) => {
  const {
    children: originalChildren,
    parseEntities,
    fontWeight = "regular",
    fontFamily,
    style,
    ...rest
  } = props;

  const children = useMemo(() => {
    if (!(typeof originalChildren === "string" && parseEntities)) {
      return originalChildren;
    }

    return parse(originalChildren);
  }, [originalChildren, parseEntities]);

  const dynamicFontFamily = useMemo((): FontFamily => {
    switch (fontWeight) {
      case "light": {
        return "sans-serif-light";
      }

      case "medium": {
        return "sans-serif-medium";
      }

      default: {
        return "sans-serif";
      }
    }
  }, [fontWeight]);

  return (
    <PaperText
      ref={ref}
      style={[{ fontFamily: fontFamily || dynamicFontFamily }, style]}
      {...rest}
    >
      {children}
    </PaperText>
  );
});

export default Text;
