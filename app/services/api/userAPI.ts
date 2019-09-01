import firebase from "react-native-firebase";
import User from "app/entities/UserEntity";

import { firebaseError } from "app/helpers/errorHandler";
import { CollectionReference } from "react-native-firebase/firestore";
import { Auth } from "react-native-firebase/auth";

const userCollection = "users";

let currentUser = new User();

function getCollection(): CollectionReference {
  return firebase.firestore().collection(userCollection);
}

function getAuth(): Auth {
  return firebase.auth();
}

async function registerUser(
  email: string,
  password: string
): Promise<boolean | User> {
  try {
    const data = await getAuth().createUserWithEmailAndPassword(
      email,
      password
    );
    const user = new User(data.user);
    return user;
  } catch (e) {
    firebaseError(e);
    return false;
  }
}

async function updateUser(userData: {
  displayName: string;
  username: string;
  bio: string;
  photoURL: string;
}): Promise<boolean> {
  const cl = getCollection();
  try {
    // cl.doc(getUserInfo().id).set(getUserInfo());
    const currentUser = getAuth().currentUser;
    currentUser &&
      currentUser.updateProfile({
        displayName: userData.displayName,
        photoURL: userData.photoURL
      });
    await cl.doc(getUserInfo().id).update(userData);
    return true;
  } catch (e) {
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
    console.log("loginUser", data);
    currentUser = new User(data.user);
    return currentUser;
  } catch (e) {
    firebaseError(e);
    return false;
  }
}

function logout() {
  getAuth().signOut();
}

function isUserLogged(): boolean {
  if (getAuth().currentUser) {
    return true;
  } else {
    return false;
  }
}

function getUserInfo() {
  console.log(currentUser);
  return currentUser;
}

const UserAPI = {
  registerUser,
  updateUser,
  loginUser,
  isUserLogged,
  getUserInfo,
  logout
};

export default UserAPI;
