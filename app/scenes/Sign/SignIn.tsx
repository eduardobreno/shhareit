import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Spinner } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";

import { Input, Button } from "app/components/Elements";

import I18n, { toggleLanguage } from "app/helpers/i18n";
import Theme from "app/resources/themes";
import UserAPI from "app/services/api/userAPI";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignIn = (props: Props) => {
  const { navigation } = props;
  const [crendential, setCrendential] = useState({ email: "", password: "" });
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState({
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
    let hasError = false;
    let msg = "";
    setCrendential({ ...crendential, password });
    if (password.length == 0) {
      hasError = true;
      msg = "Type your password";
    }
    setHasPasswordError({ hasError, msg });
  };

  const handleSubmit = async () => {
    validateEmail(crendential.email);
    validatePassword(crendential.password);
    if (!hasPasswordError.hasError && !hasEmailError) {
      setIsSubmitting(true);
      const user = await UserAPI.loginUser(
        crendential.email,
        crendential.password
      );
      if (user) {
        navigation.navigate("Main", { firstTime: false, user });
      } else {
        setIsSubmitting(false);
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  useEffect(() => {
    setTimeout(() => {
      if (UserAPI.isUserLogged()) {
        navigation.navigate("Settings", { isCompleted: false });
      }
    }, 500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
      }}>
      <ScrollView bounces={false}>
        <Text style={[Theme.stl.H1, { alignSelf: "center" }]}>Shhare it!</Text>
        <Text style={[Theme.stl.TXT_NORMAL, { alignSelf: "center" }]}>
          Type your crendentials to sign in
        </Text>
        <View style={{ marginTop: 20 }}>
          <Input
            label="E-mail"
            value={crendential.email}
            keyboardType="email-address"
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

          <Button
            bordered
            onPress={handleSubmit}
            showSpinner={isSubmitting}
            label={I18n.t("login")}
          />
          <View style={Theme.stl.divider} />
          <Text style={[Theme.stl.TXT_NORMAL, { alignSelf: "center" }]}>
            New user?
          </Text>
          <Button
            transparent
            onPress={handleSignUp}
            label={I18n.t("register")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
