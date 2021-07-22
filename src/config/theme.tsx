import {
  Theme as NavigationTheme,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

export const fonts = configureFonts({
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "Helvetica",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Helvetica-Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Helvetica-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Helvetica-Light",
      fontWeight: "normal",
    },
  },
});

export type Theme = ReactNativePaper.Theme & NavigationTheme;

export const DefaultTheme: Theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
  fonts,
};

export const DarkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    card: "#222222",
    background: "#222222",
    accent: "#0077ff",
  },
  fonts,
};
