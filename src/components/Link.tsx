import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useCallback } from "react";
import { GestureResponderEvent, Pressable, PressableProps } from "react-native";
import useIsAuthenticated from "../lib/hooks/useIsAuthenticated";

type LinkProps = PressableProps & {
  authenticated?: boolean;
};

const Link = ({ authenticated, onPress, ...props }: LinkProps) => {
  const isAuthenticated = useIsAuthenticated();

  const navigation = useNavigation();

  const onBeforePress = useCallback(
    (e: GestureResponderEvent) => {
      if (authenticated && !isAuthenticated) {
        return navigation.navigate("Authenticate", { onPress });
      }

      return onPress?.(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authenticated, isAuthenticated, onPress],
  );

  return <Pressable {...props} onPress={onBeforePress} />;
};

export default Link;
