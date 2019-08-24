import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Item, Label, Input } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import I18n, { toggleLanguage } from "app/helpers/i18n";
import Theme from "app/resources/themes";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignIn = (props: Props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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

  const handleSubmit = () => {
    validateEmail(email);
    validatePassword(password);
    confirmPassword(password2);
    if (
      !hasConfirmPasswordError.hasError &&
      !hasPasswordError.hasError &&
      !hasEmailError
    ) {
      console.log(email, password);
    }
  };

  return (
    <View>
      <Text style={Theme.stl.H1}>Welcome to Shhare it!</Text>
      <Text style={Theme.stl.H2}>
        You can start to share midia with secret!
      </Text>
      <Text style={Theme.stl.TXT_NORMAL}>Just sign in</Text>
      <View style={{ marginTop: 20 }}>
        <Item stackedLabel error={hasEmailError}>
          <Label>E-mail</Label>
          <Input
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
            onChangeText={password => confirmPassword(password)}
            secureTextEntry
          />
          {hasConfirmPasswordError.hasError && (
            <Text style={Theme.stl.TXT_ERROR}>
              {hasConfirmPasswordError.msg}
            </Text>
          )}
        </Item>

        <Button bordered full onPress={handleSubmit} style={{ marginTop: 20 }}>
          <Text style={Theme.stl.BTN_TXT_SUBMIT}>{I18n.t("signIn")}</Text>
        </Button>
      </View>
    </View>
  );
};

export default SignIn;