import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Item, Label, Input } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import firebase from "react-native-firebase";

import I18n, { toggleLanguage } from "app/helpers/i18n";
import Theme from "app/resources/themes";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignIn = (props: Props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    let hasError = false;
    let msg = "";
    setPassword(password);
    if (password.length == 0) {
      hasError = true;
      msg = "Type your password";
    }
    setHasPasswordError({ hasError, msg });
  };

  const handleSubmit = () => {
    validateEmail(email);
    validatePassword(password);
    if (
      !hasConfirmPasswordError.hasError &&
      !hasPasswordError.hasError &&
      !hasEmailError
    ) {
      console.log(email, password);
    }
    navigation.navigate("Main");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  useEffect(() => {
    // firebase
    //   .auth().signInWithEmailAndPassword
  });
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
        <Text style={[Theme.stl.TXT_NORMAL, { alignSelf: "center" }]}>
          Type your crendentials to sign in
        </Text>
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

          <Button
            bordered
            full
            onPress={handleSubmit}
            style={Theme.stl.BTN_PADDING}
          >
            <Text style={Theme.stl.BTN_TXT_NORMAL}>{I18n.t("login")}</Text>
          </Button>
          <View style={Theme.stl.divider} />
          <Text style={[Theme.stl.TXT_NORMAL, { alignSelf: "center" }]}>
            New user?
          </Text>
          <Button
            full
            transparent
            onPress={handleSignUp}
            style={Theme.stl.BTN_PADDING}
          >
            <Text style={Theme.stl.BTN_TXT_NORMAL}>{I18n.t("register")}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
