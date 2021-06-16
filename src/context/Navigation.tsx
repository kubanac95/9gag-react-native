import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { TPostType } from "../config/const";

export type RootStackParamList = {
  Home: undefined;
};

export type HomeDrawerParamList = {
  Home: undefined;
};

export type HomeStackParamList = {
  Home: {
    group: number;
    type: TPostType;
  };
};

// export type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Home"
// >;

// export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

// export type Props = {
//   route: HomeScreenRouteProp;
//   navigation: HomeScreenNavigationProp;
// };

export type HomeStackScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "Home">,
  CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList>,
    StackNavigationProp<RootStackParamList>
  >
>;
