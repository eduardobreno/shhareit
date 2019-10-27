import React from "react";

import { createStackNavigator } from "react-navigation";
import SignIn from "app/scenes/Sign/SignIn";
import SignUp from "app/scenes/Sign/SignUp";
import Hub from "app/scenes/Hub";

const AuthStack = createStackNavigator({
  Hub,
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
      // headerForceInset: { top: "never", bottom: "never" }
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
      // headerForceInset: { top: "never", bottom: "never" }
    }
  }
});

export default AuthStack;
