import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  StackActions,
  NavigationActions
} from "react-navigation";

import UserAPI from "app/services/api/userAPI";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Hub = (props: Props) => {
  const { navigation } = props;

  const isLogged = async () => {
    const isON = await UserAPI.isUserLogged();
    if (isON) {
      if (UserAPI.getData().isCompleted) {
        navigation.navigate("Main");
      } else {
        navigation.navigate("Settings", {
          isCompleted: UserAPI.getData().isCompleted
        });
      }
    } else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "SignIn" })]
      });
      navigation.dispatch(resetAction);
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

Hub.navigationOptions = () => ({
  header: null
});

export default Hub;
