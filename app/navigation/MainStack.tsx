import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Icon } from "native-base";
import Albuns from "../scenes/Home/Albuns";
import SharedWith from "../scenes/Home/SharedWith";
import Notifications from "../scenes/Home/Notifications";
import Settings from "../scenes/Home/Settings";
import MediaList from "../components/MediaList";

import Theme from "app/resources/themes";
import UserForm from "app/scenes/User/UserForm";

const TabsStack = createBottomTabNavigator(
  {
    Albuns,
    SharedWith,
    Notifications,
    Settings
  },
  {
    // initialRouteName: "Settings",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: _ => {
        const { routeName } = navigation.state;
        const tabs: { [idx: string]: string } = {
          Albuns: "md-home",
          SharedWith: "md-share",
          Notifications: "md-notifications",
          Settings: "md-settings"
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

const MainStack = createStackNavigator(
  {
    Main: {
      screen: TabsStack,
      navigationOptions: { header: null }
    },
    UserForm: UserForm,
    MediaList: MediaList
  },
  { initialRouteName: "Main" }
);
export default MainStack;
