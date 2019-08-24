import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function MediaList(props: Props) {
  const { navigation } = props;
  function signIn() {
    navigation.navigate("Auth");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "OpenSans-Regular" }}> MediaList</Text>
    </View>
  );
}

MediaList.navigationOptions = {
  headerTitleStyle: {
    fontFamily: "OpenSans-Regular"
  },
  title: "MediaList"
};

export default MediaList;
