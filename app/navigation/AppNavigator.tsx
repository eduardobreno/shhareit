import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainStack
  },

  { initialRouteName: "Auth" }
);

export default createAppContainer(AppNavigator);
