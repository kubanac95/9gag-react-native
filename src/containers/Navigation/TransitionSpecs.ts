import { TransitionSpecs } from "@react-navigation/stack";
import type { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

export const TransitionSpecSlide: TransitionSpec =
  TransitionSpecs.TransitionIOSSpec;

export const TransitionSpecEmpty: TransitionSpec = {
  animation: "timing",
  config: {
    delay: 0,
    duration: 0,
  },
};
