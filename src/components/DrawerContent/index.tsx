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

  return (
    <DrawerContentScrollView {...props}>
      {data?.data.groups.map(({ id, name }) => {
        return (
          <DrawerItem
            key={id}
            label={name}
            onPress={() =>
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
              })
            }
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

// const styles = StyleSheet.create({});

export default DrawerContent;
