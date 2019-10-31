import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Fab, Icon, Thumbnail } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

import {
  generateFileName,
  getExtensionFromFile,
  saveFileToFolder
} from "app/helpers/fileHelper";
import I18n from "app/helpers/i18n";
import Theme from "app/resources/themes";
import { customError } from "app/helpers/errorHandler";
import * as Camera from "app/helpers/CameraManager";
import * as RNFS from "react-native-fs";

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

  useEffect(() => {
    const load = async () => {
      const dir2 = await RNFS.readDir(RNFS.DocumentDirectoryPath + "/CAMERA");
      // console.log("dir", dir2);
      const mlist = dir2.map(item => item.path);
      setMedias(mlist);
    };
    load();
  }, []);

  const openCamera = async (type: "photo" | "video") => {
    const path = await Camera.openCamera(type);
    console.log("PATH", path);
  };

  const openGallery = async () => {
    const response = await Camera.openGallery();
    console.log("PATH GALLERY", response);

    if (response.fileName === undefined) return;

    const extension = getExtensionFromFile(response.fileName);
    const fileName = generateFileName(extension);
    await saveFileToFolder(fileName, response.uri, "CAMERA").catch(e => {
      console.error("ERROR saveFileToFolder", e);
    });

    const dir2 = await RNFS.readDir(RNFS.DocumentDirectoryPath + "/CAMERA");
    const mlist = dir2.map(item => item.path);
    console.log(mlist);
    setMedias(mlist);
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
            openCamera("photo");
          }}>
          <Icon name="md-camera" />
        </Button>
        <Button
          style={{ backgroundColor: "#DD5144" }}
          onPress={() => {
            setFabActive(!fabActive);
            openCamera("video");
          }}>
          <Icon name="md-videocam" />
        </Button>
        <Button
          style={{ backgroundColor: "#DD5144" }}
          onPress={() => {
            setFabActive(!fabActive);
            openGallery();
          }}>
          <Icon name="md-albums" />
        </Button>
      </Fab>
      <Text style={{ fontFamily: "OpenSans-Regular" }}> Albuns</Text>
      {medias.map((item, index) => {
        return (
          <Thumbnail
            key={index}
            large
            square
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
