import { StackNavigationOptions } from "@react-navigation/stack";

import * as CustomTransitionSpecs from "./TransitionSpecs";

export const rootStackNavigationOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  gestureResponseDistance: {
    horizontal: 300,
  },
  transitionSpec: {
    close: CustomTransitionSpecs.TransitionSpecSlide,
    open: CustomTransitionSpecs.TransitionSpecSlide,
  },
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export { CustomTransitionSpecs };
