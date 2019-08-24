import React from "react";
import { Icon } from "native-base";

import { createBottomTabNavigator } from "react-navigation";
import SignIn from "../scenes/Sign/SignIn";
import SignUp from "../scenes/Sign/SignUp";
import Theme from "app/resources/themes";
import { withSafeAreaView } from "app/resources/themes/helper";
const AuthStack = createBottomTabNavigator(
  {
    SignIn: withSafeAreaView(SignIn),
    SignUp: withSafeAreaView(SignUp)
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: _ => {
        const { routeName } = navigation.state;
        const tabs: { [idx: string]: string } = {
          SignIn: "md-home",
          SignUp: "md-create"
        };

        return <Icon name={tabs[routeName]} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Theme.stl.tab.activeTintColor,
      inactiveTintColor: Theme.stl.tab.inactiveTintColor,
      labelStyle: {
        fontFamily: Theme.base.PRIMARY_FONT_FAMILY
      }
    }
  }
);

export default AuthStack;
