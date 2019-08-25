import firebase from "react-native-firebase";
import User from "app/entities/UserEntity";

async function registerUser(
  email: string,
  password: string
): Promise<{ success: boolean; msg?: string; user?: User }> {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = new User(data.user);
    return { success: true, user };
  } catch (e) {
    switch (e.code) {
      case "auth/email-already-in-use":
        return { success: false, msg: "Email already in use" };
      default:
        return {
          success: false,
          msg: "Something bad happened, please, try again later! =["
        };
    }
  }
}

const UserAPI = {
  registerUser
};

export default UserAPI;
