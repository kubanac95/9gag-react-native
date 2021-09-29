type RootStackParamList = {
  Home:
    | import("@react-navigation/native").NavigatorScreenParams<DrawerParamList>
    | undefined;
  Post: {
    url: string;
    post?: IPost;
  };
  Thread: {
    url: string;
    commentId: string;
  };
};

type DrawerParamList = {
  Home:
    | import("@react-navigation/native").NavigatorScreenParams<HomeTabParamList>
    | { group: string }
    | undefined;
};

type HomeTabParamList = {
  [key in TPostType]?: undefined;
};

type RootStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<RootStackParamList>;

type DrawerNavigationProp = import("@react-navigation/native").CompositeNavigationProp<
  import("@react-navigation/drawer").DrawerNavigationProp<DrawerParamList>,
  RootStackNavigationProp
>;

type HomeTabNavigationProp = import("@react-navigation/native").CompositeNavigationProp<
  import("@react-navigation/material-bottom-tabs").MaterialBottomTabNavigationProp<HomeTabParamList>,
  DrawerNavigationProp
>;
