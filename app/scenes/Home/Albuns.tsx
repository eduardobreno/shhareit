import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import I18n from "app/helpers/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Albuns(props: Props) {
  const { navigation } = props;
  function signIn() {
    navigation.navigate("MediaList");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "OpenSans-Regular" }} > Albuns</Text>
      <Button onPress={signIn}>
        <Text>{I18n.t("mediaList")}</Text>
      </Button>
    </View>
  );
}

Albuns.navigationOptions = {
  headerTitleStyle: {
    fontFamily: "OpenSans-Regular"
  },
  title: "Albuns"
};

export default Albuns;
