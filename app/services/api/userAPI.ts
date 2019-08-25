import firebase from "react-native-firebase";
import User from "app/entities/UserEntity";

import { firebaseError } from "app/helpers/errorHandler";

async function registerUser(
  email: string,
  password: string
): Promise<boolean | User> {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = new User(data.user);
    return user;
  } catch (e) {
    firebaseError(e);
    return false;
  }
}

async function loginUser(
  email: string,
  password: string
): Promise<boolean | User> {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("loginUser - ", data);
    const user = new User(data.user);
    return user;
  } catch (e) {
    firebaseError(e);
    return false;
  }
}

const UserAPI = {
  registerUser,
  loginUser
};

export default UserAPI;
