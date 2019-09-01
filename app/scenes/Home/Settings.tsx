import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Thumbnail } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import I18n from "app/helpers/i18n";
import UserAPI from "app/services/api/userAPI";
import User from "app/entities/UserEntity";
import { withPadding } from "app/resources/themes/helper";
import Theme from "app/resources/themes";
import { Input, Button } from "app/components/Elements";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Settings(props: Props) {
  const { navigation } = props;
  const [user, setUser] = useState<User>(UserAPI.getUserInfo());
  const [photo, setPhoto] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = () => {
    setIsSubmitting(true);
    UserAPI.logout();
    setTimeout(() => {
      navigation.navigate("Auth");
    }, 500);
  };

  useEffect(() => {
    // setUser(UserAPI.getUserInfo());
    // UserAPI.updateUser({
    //   displayName: "joao",
    //   username: "username",
    //   bio: "bio vazia",
    //   photoURL: "url da foto"
    // });
  }, []);

  useEffect(() => {
    console.log(user);
    if (user && user.photoURL) {
      setPhoto({ uri: user.photoURL });
    } else {
      setPhoto(require("app/assets/images/placeholder_profile.png"));
    }
    console.log(photo);
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20
      }}>
      <ScrollView bounces={false}>
        <Thumbnail
          circular
          large
          source={photo}
          style={{ alignSelf: "center" }}
        />

        <Input
          label="Display Name"
          value={user.displayName}
          onChangeText={email => {}}
        />
        <Input
          label="Username"
          value={user.displayName}
          onChangeText={email => {}}
        />
        <Input
          label="E-mail"
          keyboardType="email-address"
          value={user.displayName}
          onChangeText={email => {}}
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
  const { state } = navigation;
  const { params } = state;
  return {
    headerTitleStyle: {
      fontFamily: Theme.base.PRIMARY_FONT_FAMILY
    },
    title: "Settings",
    tabBarVisible: params && params.isCompleted
  };
};

export default withPadding(Settings);
