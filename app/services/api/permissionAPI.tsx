import Permissions from "react-native-permissions";
import AndroidOpenSettings from "react-native-android-open-settings";

import { Alert, Platform } from "react-native";

export async function askDefaultPermission() {
  const response = await Permissions.checkMultiple(["camera", "photo"]);
  console.log(response);
  switch (response.photo) {
    case "undetermined":
      return alertForPermission(response.photo, "camera");
    case "denied":
      return alertNoPermission();
    case "restricted":
      return alertNoPermission();
    case "authorized":
      return Promise.resolve(true);
  }
  switch (response.camera) {
    case "undetermined":
      return alertForPermission(response.photo, "photo");
    case "denied":
      return alertNoPermission();
    case "restricted":
      return alertNoPermission();
    case "authorized":
      return Promise.resolve(true);
  }
}

async function requestPermission(permission: string) {
  const result = await Permissions.request(permission);
  if (result == "denied") {
    return alertForPermission(result, permission);
  } else {
    return Promise.resolve(true);
  }
}

function alertNoPermission() {
  return new Promise(resolve => {
    Alert.alert("We don't have permission", "You need to set it manually", [
      {
        text: "No way",
        onPress: () => resolve(false),
        style: "cancel"
      },
      {
        text: "Open Setting",
        onPress: Platform.select({
          ios: Permissions.openSettings,
          android: AndroidOpenSettings.appDetailsSettings
        })
      }
    ]);
  });
}

async function alertForPermission(status: string, permission: string) {
  return new Promise(resolve => {
    Alert.alert(
      "Can we access your photos?",
      "We need access so you can set your profile pic",
      [
        {
          text: "No way",
          onPress: () => resolve(false),
          style: "cancel"
        },
        status == "undetermined"
          ? {
              text: "OK",
              onPress: () => resolve(requestPermission(permission))
            }
          : Platform.OS == "ios"
          ? {
              text: "Open Settings",
              onPress: Permissions.openSettings
            }
          : {
              text: "Ok",
              onPress: () => resolve(requestPermission(permission))
            }
      ]
    );
  });
}
