import { Toast } from "native-base";

export const firebaseError = (error: { code: any }): boolean => {
  console.log("firebaseError", error.code);
  switch (error.code) {
    case "auth/email-already-in-use":
      Toast.show({
        text: "Email already in use",
        buttonText: "OK",
        duration: 2000,
        type: "danger"
      });
      return false;
    case "auth/user-not-found":
    case "auth/wrong-password":
      Toast.show({
        text: "Invalid credentials",
        buttonText: "OK",
        duration: 2000,
        type: "danger"
      });
      return false;
    default:
      Toast.show({
        text: "Something bad happened, please, try again later! =[",
        buttonText: "OK",
        duration: 2000,
        type: "danger"
      });
      return false;
  }
};

export const customError = (message: string) => {
  Toast.show({
    text: message,
    buttonText: "OK",
    duration: 2000,
    type: "danger"
  });
};
