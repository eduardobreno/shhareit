import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Item, Label, Input, Toast } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";

import I18n, { toggleLanguage } from "app/helpers/i18n";
import Theme from "app/resources/themes";
import UserAPI from "app/services/api/userAPI";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignUp = (props: Props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("e@e.com");
  const [password, setPassword] = useState("123456a");
  const [password2, setPassword2] = useState("123456a");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState({
    hasError: false,
    msg: ""
  });
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState({
    hasError: false,
    msg: ""
  });

  const validateEmail = (email: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(email);
    if (reg.test(email)) {
      setHasEmailError(false);
    } else {
      setHasEmailError(true);
    }
  };
  const validatePassword = (password: string) => {
    const reg = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    let hasError = false;
    let msg = "";
    setPassword(password);
    if (password.length < 6) {
      hasError = true;
      msg = "Use at lest 6 characters";
    } else if (reg.test(password) === false) {
      hasError = true;
      msg = "Use at least one number or one letter";
    }
    setHasPasswordError({ hasError, msg });
  };

  const confirmPassword = (pwd: string) => {
    let hasError = false;
    let msg = "";
    setPassword2(pwd);
    if (pwd !== password) {
      hasError = true;
      msg = "Could not confirm the password, type right";
    }
    setHasConfirmPasswordError({ hasError, msg });
  };

  const handleSubmit = async () => {
    validateEmail(email);
    validatePassword(password);
    confirmPassword(password2);
    if (
      !hasConfirmPasswordError.hasError &&
      !hasPasswordError.hasError &&
      !hasEmailError
    ) {
      const result = await UserAPI.registerUser(email, password);
      if (result.success) {
        navigation.navigate("Main", { firstTime: true, user: result.user });
      } else {
        Toast.show({
          text: result.msg!,
          buttonText: "Okay",
          duration: 3000,
          type: "danger"
        });
      }
    }
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "yellow"
      }}
    >
      <ScrollView bounces={false}>
        <Text style={[Theme.stl.H1, { alignSelf: "center" }]}>Shhare it!</Text>
        <Text style={[Theme.stl.H2, { alignSelf: "center" }]}>
          You can start to share medias with secret after your register
        </Text>
        <View style={{ marginTop: 20 }}>
          <Item stackedLabel error={hasEmailError}>
            <Label>E-mail</Label>
            <Input
              value={email}
              keyboardType="email-address"
              onChangeText={email => validateEmail(email)}
            />
            {hasEmailError && (
              <Text style={Theme.stl.TXT_ERROR}>Invalid email</Text>
            )}
          </Item>
          <Item stackedLabel error={hasPasswordError.hasError}>
            <Label>Password</Label>
            <Input
              value={password}
              onChangeText={password => validatePassword(password)}
              secureTextEntry
            />
            {hasPasswordError.hasError && (
              <Text style={Theme.stl.TXT_ERROR}>{hasPasswordError.msg}</Text>
            )}
          </Item>
          <Item stackedLabel error={hasConfirmPasswordError.hasError}>
            <Label>Type again to confirm your password</Label>
            <Input
              value={password2}
              onChangeText={password => confirmPassword(password)}
              secureTextEntry
            />
            {hasConfirmPasswordError.hasError && (
              <Text style={Theme.stl.TXT_ERROR}>
                {hasConfirmPasswordError.msg}
              </Text>
            )}
          </Item>

          <Button
            bordered
            full
            onPress={handleSubmit}
            style={Theme.stl.BTN_PADDING}
          >
            <Text style={Theme.stl.BTN_TXT_NORMAL}>{I18n.t("register")}</Text>
          </Button>
          <View style={Theme.stl.divider} />
          <Text style={[Theme.stl.TXT_NORMAL, { alignSelf: "center" }]}>
            Already a user?
          </Text>
          <Button
            transparent
            full
            onPress={handleSignIn}
            style={Theme.stl.BTN_PADDING}
          >
            <Text style={Theme.stl.BTN_TXT_NORMAL}>{I18n.t("login")}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
