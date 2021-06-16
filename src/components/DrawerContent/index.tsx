import React from "react";

// import { StyleSheet } from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { useQuery } from "react-query";

function DrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { data } = useQuery<
    APIResponse<{ dummyField: string; groups: IGroup[] }>
  >(["group-list"]);

  return (
    <DrawerContentScrollView {...props}>
      {data?.data.groups.map(({ id, name }) => {
        return (
          <DrawerItem
            key={id}
            label={name}
            onPress={() => navigation.navigate("Home")}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

// const styles = StyleSheet.create({});

export default DrawerContent;
