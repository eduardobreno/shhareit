import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Spinner } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import I18n from "app/helpers/i18n";
import UserAPI from "app/services/api/userAPI";

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

function Settings(props: Props) {
  const { navigation } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = () => {
    setIsSubmitting(true);
    UserAPI.logout();
    setTimeout(() => {
      navigation.navigate("Auth");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "OpenSans-Regular" }}> Settings</Text>
      <Button onPress={logout}>
        {isSubmitting && <Spinner />}
        {!isSubmitting && <Text>{I18n.t("logout")}</Text>}
      </Button>
    </View>
  );
}

Settings.navigationOptions = {
  headerTitleStyle: {
    fontFamily: "OpenSans-Regular"
  },
  title: "Settings"
};

export default Settings;
