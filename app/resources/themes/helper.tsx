import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Theme from "./index";

export const withSafeAreaView = (Component: React.ElementType) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: Theme.colors.PRIMARY_BACKGROUND_COLOR_LIGHT
    }
  });
  return class extends React.Component {
    render() {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <View style={styles.container}>
            <Component />
          </View>
        </SafeAreaView>
      );
    }
  };
};
