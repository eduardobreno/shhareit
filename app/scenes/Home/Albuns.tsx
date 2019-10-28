import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Fab, Icon, Thumbnail } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import * as RNFS from "react-native-fs";

import { generateFileName } from "app/helpers/file";
import I18n from "app/helpers/i18n";
import Theme from "app/resources/themes";
import { customError } from "app/helpers/errorHandler";

import { askDefaultPermission } from "app/services/api/permissionAPI";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Albuns(props: Props) {
  const { navigation } = props;

  const [medias, setMedias] = useState<string[]>([]);
  const [fabActive, setFabActive] = useState(false);

  const cbCamera = async (response: ImagePickerResponse) => {
    if (response.error) {
      customError("Couldn't get your photo, sorry! =[");
      console.error("pickImage: ", response);
    } else if (response.didCancel) {
    } else {
      let ext = ".unknown";
      if (response.fileName) {
        const arrFN = response.fileName.split(".");
        ext = arrFN[arrFN.length - 1];
      }

      const fileName = generateFileName(ext);
      RNFS.mkdir(RNFS.DocumentDirectoryPath + "/media", {
        NSURLIsExcludedFromBackupKey: true
      });
      await RNFS.copyFile(
        response.uri,
        RNFS.DocumentDirectoryPath + "/media/" + fileName
      );
      const dir2 = await RNFS.readDir(RNFS.DocumentDirectoryPath + "/media");
      const mlist = dir2.map(item => item.path);
      setMedias(mlist);
    }
  };

  useEffect(() => {
    const load = async () => {
      const dir2 = await RNFS.readDir(RNFS.DocumentDirectoryPath + "/media");
      console.log("dir", dir2);
      const mlist = dir2.map(item => item.path);
      setMedias(mlist);
    };
    load();
  }, []);

  const callCamera = async (type: "photo" | "video") => {
    const hasPermission = await askDefaultPermission();
    if (!hasPermission) return;
    ImagePicker.launchCamera(
      {
        mediaType: type,
        noData: true
      },
      cbCamera
    );
  };

  const callGallery = async () => {
    const hasPermission = await askDefaultPermission();
    if (!hasPermission) return;
    ImagePicker.launchImageLibrary(
      {
        mediaType: "mixed",
        noData: true
      },
      cbCamera
    );
  };

  return (
    <View style={styles.container}>
      <Fab
        active={fabActive}
        direction="up"
        containerStyle={{}}
        position="bottomRight"
        onPress={() => {
          setFabActive(!fabActive);
        }}>
        <Icon name="md-add" />
        <Button
          style={{ backgroundColor: "#DD5144" }}
          onPress={() => {
            setFabActive(!fabActive);
            callCamera("photo");
          }}>
          <Icon name="md-camera" />
        </Button>
        <Button
          style={{ backgroundColor: "#DD5144" }}
          onPress={() => {
            setFabActive(!fabActive);
            callCamera("video");
          }}>
          <Icon name="md-videocam" />
        </Button>
        <Button
          style={{ backgroundColor: "#DD5144" }}
          onPress={() => {
            setFabActive(!fabActive);
            callGallery();
          }}>
          <Icon name="md-albums" />
        </Button>
      </Fab>
      <Text style={{ fontFamily: "OpenSans-Regular" }}> Albuns</Text>
      {medias.map((item, index) => {
        console.log(item);
        return (
          <Thumbnail
            key={index}
            large
            source={{
              uri: "file:///" + item
            }}
            style={{ alignSelf: "center" }}
          />
        );
      })}
    </View>
  );
}

Albuns.navigationOptions = {
  headerTitleStyle: {
    fontFamily: Theme.base.PRIMARY_FONT_FAMILY
  },
  title: "Albuns"
};

export default Albuns;
