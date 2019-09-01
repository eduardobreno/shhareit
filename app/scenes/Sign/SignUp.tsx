import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";

import I18n, { toggleLanguage } from "app/helpers/i18n";
import Theme from "app/resources/themes";
import UserAPI from "app/services/api/userAPI";
import { Input, Button } from "app/components/Elements";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignUp = (props: Props) => {
  const { navigation } = props;
  const [crendential, setCrendential] = useState({ email: "", password: "" });
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setCrendential({ ...crendential, email });
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
    setCrendential({ ...crendential, password });
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
    if (pwd !== crendential.password) {
      hasError = true;
      msg = "Could not confirm the password";
    }
    setHasConfirmPasswordError({ hasError, msg });
  };

  const handleSubmit = async () => {
    validateEmail(crendential.email);
    validatePassword(crendential.password);
    confirmPassword(password2);
    if (
      !hasConfirmPasswordError.hasError &&
      !hasPasswordError.hasError &&
      !hasEmailError
    ) {
      setIsSubmitting(true);
      const user = await UserAPI.registerUser(
        crendential.email,
        crendential.password
      );
      if (user) {
        navigation.navigate("Main", { firstTime: true, user });
      } else {
        setIsSubmitting(false);
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
        alignItems: "center"
      }}>
      <ScrollView bounces={false}>
        <Text style={[Theme.stl.H1, { alignSelf: "center" }]}>Shhare it!</Text>
        <Text style={[Theme.stl.H2, { alignSelf: "center" }]}>
          You can start to share medias with secret after your register
        </Text>
        <View style={{ marginTop: 20 }}>
          <Input
            label="E-mail"
            value={crendential.email}
            hasError={hasEmailError}
            errorMsg={"Invalid email"}
            onChangeText={email => validateEmail(email)}
          />
          <Input
            label="Password"
            value={crendential.password}
            hasError={hasPasswordError.hasError}
            errorMsg={hasPasswordError.msg}
            onChangeText={password => validatePassword(password)}
            secureTextEntry
          />
          <Input
            label="Type again to confirm your password"
            value={password2}
            hasError={hasConfirmPasswordError.hasError}
            errorMsg={hasConfirmPasswordError.msg}
            onChangeText={password => confirmPassword(password)}
            secureTextEntry
          />

          <Button
            bordered
            onPress={handleSubmit}
            showSpinner={isSubmitting}
            label={I18n.t("register")}
          />
          <View style={Theme.stl.divider} />
          <Text style={[Theme.stl.TXT_NORMAL, { alignSelf: "center" }]}>
            New user?
          </Text>
          <Button transparent onPress={handleSignIn} label={I18n.t("login")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
