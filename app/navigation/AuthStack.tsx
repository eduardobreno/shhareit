import React from "react";
import { Icon } from "native-base";

import { createBottomTabNavigator } from "react-navigation";
import SignIn from "app/scenes/Sign/SignIn";
import SignUp from "app/scenes/Sign/SignUp";
import Theme from "app/resources/themes";
import { withPadding } from "app/resources/themes/helper";

const AuthStack = createBottomTabNavigator(
  {
    SignIn: withPadding(SignIn),
    SignUp: withPadding(SignUp)
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
      activeBackgroundColor: Theme.stl.tab.activeBackgroundColor,
      inactiveTintColor: Theme.stl.tab.inactiveTintColor,
      inactiveBackgroundColor: Theme.stl.tab.inactiveBackgroundColor,
      labelStyle: {
        fontFamily: Theme.base.PRIMARY_FONT_FAMILY
      },
      keyboardHidesTabBar: true,
      // @ts-ignore
      safeAreaInset: { bottom: "never", top: "never" }
    }
  }
);

export default AuthStack;
