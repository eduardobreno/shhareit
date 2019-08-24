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

function SignUp(props: Props) {
  const { navigation } = props;
  function signIn() {
    navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "OpenSans-Regular" }} > Regular</Text>
      <Button onPress={signIn}>
        <Text>{I18n.t("signUp")}</Text>
      </Button>
    </View>
  );
}

SignUp.navigationOptions = {
  headerTitleStyle: {
    fontFamily: "OpenSans-Regular"
  },
  title: "Sign Up"
};

export default SignUp;
