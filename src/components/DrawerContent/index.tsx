import React from "react";

// import { StyleSheet } from "react-native";
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// const styles = StyleSheet.create({});

export default DrawerContent;
