import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import Albuns from "../scenes/Home/Albuns";
import SharedWith from "../scenes/Home/SharedWith";
import Notifications from "../scenes/Home/Notifications";
import Settings from "../scenes/Home/Settings";
import MediaList from "../components/MediaList";

const TabsStack = createBottomTabNavigator(
  {
    Albuns: Albuns,
    SharedWith: SharedWith,
    Notifications: Notifications,
    Settings: Settings
  },
  { initialRouteName: "Albuns" }
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: TabsStack,
      navigationOptions: { header: null }
    },
    MediaList: MediaList

  },
  { initialRouteName: "Main" }
);
export default MainStack;
