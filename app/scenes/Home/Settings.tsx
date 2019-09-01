import React, { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Thumbnail } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import ImagePicker, { ImagePickerOptions } from "react-native-image-picker";
import I18n from "app/helpers/i18n";
import UserAPI from "app/services/api/userAPI";
import User from "app/entities/UserEntity";
import { withPadding } from "app/resources/themes/helper";
import Theme from "app/resources/themes";
import { Input, Button, Textarea, LabelDivider } from "app/components/Elements";
import { customError } from "app/helpers/errorHandler";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const options: ImagePickerOptions = {
  title: "Select Image",
  mediaType: "photo",
  noData: true,
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.8
};

function Settings(props: Props) {
  const { navigation } = props;
  const [user, setUser] = useState<User>(UserAPI.getData());
  const [photo, setPhoto] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    setIsSaving(true);
    await UserAPI.updateUser(user);
    setIsSaving(false);
  };

  const logout = () => {
    setIsSubmitting(true);
    UserAPI.logout();
    setTimeout(() => {
      navigation.navigate("Auth");
    }, 500);
  };

  const pickImage = () => {
    customError("Couldn't upload your photo, sorry! =[");
    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        customError("Couldn't upload your photo, sorry! =[");
        console.error("pickImage: ", response);
      } else if (response.didCancel) {
      } else {
        const source = { uri: response.uri };
        UserAPI.uploadProfilePhoto(
          response.uri,
          async snapshot => {
            if (snapshot.state === "success") {
              await UserAPI.updateUserPhoto({
                photoURL: snapshot.downloadURL
              });
              setPhoto(source);
            }
          },
          error => {
            customError("Couldn't upload your photo, sorry! =[");
            console.error("pickImage CB: ", error);
          }
        );
      }
    });
  };

  useEffect(() => {
    if (user && user.photoURL) {
      setPhoto({ uri: user.photoURL });
    } else {
      setPhoto(require("app/assets/images/placeholder_profile.png"));
    }
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20
      }}>
      <ScrollView bounces={false}>
        <LabelDivider>Public info</LabelDivider>
        <TouchableWithoutFeedback onPress={pickImage}>
          <Thumbnail
            circular
            large
            source={photo}
            style={{ alignSelf: "center" }}
          />
        </TouchableWithoutFeedback>
        <Input
          label="Display Name"
          value={user.displayName}
          onChangeText={displayName => setUser({ ...user, displayName })}
        />
        <Input
          label="Username"
          value={user.username}
          onChangeText={username => setUser({ ...user, username })}
        />
        <Textarea
          label="Bio"
          rowSpan={3}
          underline
          bordered={false}
          value={user.bio}
          onChangeText={bio => setUser({ ...user, bio })}
        />
        <LabelDivider>Private info</LabelDivider>
        <Input label="E-mail" value={user.email} editable={false} />

        <Button showSpinner={isSaving} onPress={save} label={I18n.t("save")} />
        <Button
          transparent
          showSpinner={isSubmitting}
          onPress={logout}
          label={I18n.t("logout")}
        />
      </ScrollView>
    </View>
  );
}

Settings.navigationOptions = ({ navigation }: Props) => {
  const { state } = navigation;
  const { params } = state;
  return {
    headerTitleStyle: {
      fontFamily: Theme.base.PRIMARY_FONT_FAMILY
    },
    title: "Settings",
    tabBarVisible: params && params.isCompleted
  };
};

export default withPadding(Settings);
