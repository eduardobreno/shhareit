import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import { askDefaultPermission } from "app/services/api/permissionAPI";

const cbCamera = async (
  response: ImagePickerResponse,
  resolve: (response?: ImagePickerResponse) => void,
  reject: (response?: ImagePickerResponse) => void
) => {
  console.log("cbCamera", response);
  if (response.error) {
    console.error("pickImage: ", response);
    reject(response);
  } else if (response.didCancel) {
  } else {
    resolve(response);
  }
};

export const openCamera = async (type: "photo" | "video") => {
  const hasPermission = await askDefaultPermission();
  if (!hasPermission) return Promise.reject("NO_PERMISSION");
  return new Promise<ImagePickerResponse>((resolve, reject) => {
    ImagePicker.launchCamera(
      {
        mediaType: type,
        noData: true
      },
      response => {
        cbCamera(response, resolve, reject);
      }
    );
  });
};

export const openGallery = async () => {
  const hasPermission = await askDefaultPermission();
  if (!hasPermission) return Promise.reject("NO_PERMISSION");
  return new Promise<ImagePickerResponse>((resolve, reject) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "mixed",
        noData: true
      },
      response => {
        cbCamera(response, resolve, reject);
      }
    );
  });
};
