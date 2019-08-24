import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { StyleProvider } from "native-base";

// import getTheme from "../native-base-theme/components";
// import platform from "../native-base-theme/variables/material";
import { YellowBox } from "react-native";

// YellowBox.ignoreWarnings([
//   "Warning: componentWillMount is deprecated",
//   "Warning: componentWillUpdate is deprecated",
//   "Warning: componentWillReceiveProps is deprecated"
// ]);
function App() {
  return (
    // <StyleProvider style={getTheme(platform)}>
    <AppNavigator />
    //</StyleProvider>
  );
}

export default App;
