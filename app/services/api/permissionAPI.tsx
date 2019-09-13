import Permissions from "react-native-permissions";
import AndroidOpenSettings from "react-native-android-open-settings";

import { Alert, Platform } from "react-native";

export async function askDefaultPermission() {
  const response = await Permissions.checkMultiple(["camera", "photo"]);
  switch (response.photo) {
    case "undetermined":
    case "denied":
      return alertForPermission(response.photo, "photo");
    case "restricted":
      Alert.alert("We don't have permission", "You need to set it manually", [
        {
          text: "No way",
          onPress: () => Promise.resolve(false),
          style: "cancel"
        },
        {
          text: "Open Setting",
          onPress: AndroidOpenSettings.appDetailsSettings
        }
      ]);
      break;
    case "authorized":
      return Promise.resolve(true);
  }
  switch (response.camera) {
    case "undetermined":
    case "denied":
      return alertForPermission(response.camera, "camera");
    case "restricted":
      Alert.alert("We don't have permission", "You need to set it manually", [
        {
          text: "No way",
          onPress: () => Promise.resolve(false),
          style: "cancel"
        },
        {
          text: "Open Setting",
          onPress: AndroidOpenSettings.appDetailsSettings
        }
      ]);
      break;
    case "authorized":
      return Promise.resolve(true);
  }
}

async function requestPermission(permission: string) {
  const result = await Permissions.request(permission);
  console.log("requestPermission", result);
  if (result == "denied") {
    return alertForPermission(result, permission);
  } else {
    Promise.resolve(true);
  }
}

async function alertForPermission(status: string, permission: string) {
  Alert.alert(
    "Can we access your photos?",
    "We need access so you can set your profile pic",
    [
      {
        text: "No way",
        onPress: () => Promise.resolve(false),
        style: "cancel"
      },
      status == "undetermined"
        ? { text: "OK", onPress: () => requestPermission(permission) }
        : Platform.OS == "ios"
        ? {
            text: "Open Settings",
            onPress: Permissions.openSettings
          }
        : {
            text: "Ok",
            onPress: () => requestPermission(permission)
          }
    ]
  );
}
