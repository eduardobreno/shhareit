import React from "react";
import { Icon } from "native-base";

import { createStackNavigator } from "react-navigation";
import SignIn from "app/scenes/Sign/SignIn";
import SignUp from "app/scenes/Sign/SignUp";
import Theme from "app/resources/themes";
import { withPadding } from "app/resources/themes/helper";

const AuthStack = createStackNavigator({
  SignIn: {
    screen: withPadding(SignIn),
    navigationOptions: {
      header: null
      // headerForceInset: { top: "never", bottom: "never" }
    }
  },
  SignUp: {
    screen: withPadding(SignUp),
    navigationOptions: {
      header: null
      // headerForceInset: { top: "never", bottom: "never" }
    }
  }
});

export default AuthStack;
