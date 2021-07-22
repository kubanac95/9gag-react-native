import React from "react";

// import { StyleSheet } from "react-native";
import map from "lodash/map";

import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import { useCallback } from "react";

function DrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation<DrawerNavigationProp>();

  const queryClient = useQueryClient();

  const { data } = useQuery<
    APIResponse<{ dummyField: string; groups: IGroup[] }>
  >(["group-list"], {
    onSuccess: (responseData) => {
      map(responseData?.data?.groups, (group) => {
        queryClient.setQueryData([`group/${group.id}`], group);
      });
    },
  });

  const onPress = useCallback(
    (group: Pick<IGroup, "id" | "name">) => {
      const { id, name } = group;

      navigation.navigate("Home", {
        state: {
          routes: [
            {
              name: "Home",
              params: {
                title: name,
              },
              state: {
                routes: [
                  {
                    name: "Home",
                    params: {
                      group: `${id}`,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    },
    [navigation],
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        key={1}
        label="Home"
        onPress={() => onPress({ id: "1", name: "Home" })}
      />
      {data?.data.groups.map((group) => {
        const { id, name } = group;

        return (
          <DrawerItem key={id} label={name} onPress={() => onPress(group)} />
        );
      })}
    </DrawerContentScrollView>
  );
}

// const styles = StyleSheet.create({});

export default DrawerContent;
