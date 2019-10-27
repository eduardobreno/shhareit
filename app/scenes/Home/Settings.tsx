import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Thumbnail, Icon, Toast } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import I18n from "app/helpers/i18n";
import UserAPI from "app/services/api/userAPI";
import User from "app/entities/UserEntity";
import Theme from "app/resources/themes";
import { Button } from "app/components/Elements";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Settings(props: Props) {
  const { navigation } = props;
  const [user, setUser] = useState<User>(UserAPI.getData());
  const [photo, setPhoto] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const edit = () => {
    navigation.navigate("UserForm");
  };

  const logout = () => {
    setIsSubmitting(true);
    UserAPI.logout();
    setTimeout(() => {
      navigation.navigate("Auth");
    }, 500);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("didFocus", () => {
      navigation.setParams({ isCompleted: UserAPI.getData().isCompleted });
    });
    return unsubscribe.remove;
  }, []);

  useEffect(() => {
    if (user && user.photoURL) {
      setPhoto({ uri: user.photoURL });
    } else {
      setPhoto(require("app/assets/images/placeholder_profile.png"));
    }
    if (navigation.getParam("isCompleted") !== true) {
      setTimeout(() => {
        Toast.show({
          text: "Complete your profile",
          duration: 5000,
          type: "warning"
        });
      }, 1000);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 150
      }}>
      <ScrollView bounces={false}>
        <Thumbnail
          circular
          large
          source={photo}
          style={{ alignSelf: "center" }}
        />

        <Text style={{ alignSelf: "center" }}>{user.displayName}</Text>
        <Button
          showSpinner={isSubmitting}
          onPress={edit}
          label={I18n.t("editProfile")}
        />
        <Button
          transparent
          showSpinner={isSubmitting}
          onPress={logout}
          label={I18n.t("logout")}
        />
      </ScrollView>
    </View>
  );
}

Settings.navigationOptions = ({ navigation }: Props) => {
  return {
    headerTitleStyle: {
      fontFamily: Theme.base.PRIMARY_FONT_FAMILY
    },
    title: "Settings",
    tabBarVisible: navigation.getParam("isCompleted")
  };
};

export default Settings;
