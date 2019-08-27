import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Spinner, Thumbnail } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import I18n from "app/helpers/i18n";
import UserAPI from "app/services/api/userAPI";
import User from "app/entities/UserEntity";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
let isToHide = false;
function Settings(props: Props) {
  const { navigation } = props;
  const [user, setUser] = useState<User>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = () => {
    setIsSubmitting(true);
    UserAPI.logout();
    setTimeout(() => {
      navigation.navigate("Auth");
      setIsSubmitting(false);
    }, 500);
  };

  useEffect(() => {
    setUser(UserAPI.getUserInfo());
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Thumbnail
          circular
          large
          source={require("app/assets/images/placeholder_profile.png")}
        />
        {/* <Text>{user?.email}</Text> */}
      </View>
      <Button onPress={logout}>
        {isSubmitting && <Spinner />}
        {!isSubmitting && <Text>{I18n.t("logout")}</Text>}
      </Button>
    </View>
  );
}

Settings.navigationOptions = ({ navigation }: Props) => {
  return {
    headerTitleStyle: {
      fontFamily: "OpenSans-Regular"
    },
    title: "Settings",
    tabBarVisible: navigation.state.params.isCompleted
  };
};

export default Settings;
