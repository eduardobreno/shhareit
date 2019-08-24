import React, { Fragment } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { StyleProvider } from "native-base";

// import getTheme from "../native-base-theme/components";
// import platform from "../native-base-theme/variables/material";
import {
  YellowBox,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import Theme from "./resources/themes";

// YellowBox.ignoreWarnings([
//   "Warning: componentWillMount is deprecated",
//   "Warning: componentWillUpdate is deprecated",
//   "Warning: componentWillReceiveProps is deprecated"
// ]);
function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "pink"
    }
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "blue" }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default App;
