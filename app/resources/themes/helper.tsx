import React from "react";
import { StyleSheet, View } from "react-native";

export const withPadding = (Component: React.ElementType) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20
    }
  });
  return class extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Component />
        </View>
      );
    }
  };
};
