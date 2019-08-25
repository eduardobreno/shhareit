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
    const user = new User(data.user);
    return user;
  } catch (e) {
    firebaseError(e);
    return false;
  }
}

function logout() {
  firebase.auth().signOut();
}

function isUserLogged(): boolean {
  if (firebase.auth().currentUser) {
    return true;
  } else {
    return false;
  }
}

const UserAPI = {
  registerUser,
  loginUser,
  isUserLogged,
  logout
};

export default UserAPI;