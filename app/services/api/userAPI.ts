import firebase from "react-native-firebase";
import User from "app/entities/UserEntity";

import { firebaseError } from "app/helpers/errorHandler";
import { CollectionReference } from "react-native-firebase/firestore";
import { Auth } from "react-native-firebase/auth";
import { UploadTaskSnapshot } from "react-native-firebase/storage";

const userCollection = "users";

let currentUser = new User();

function getCollection(): CollectionReference {
  return firebase.firestore().collection(userCollection);
}

function getAuth(): Auth {
  return firebase.auth();
}

async function getUserData() {
  const uid = firebase.auth()!.currentUser!.uid;
  const user = await getCollection()
    .doc(uid)
    .get();
  return user;
}

async function registerUser(
  email: string,
  password: string
): Promise<boolean | User> {
  const cl = getCollection();
  try {
    const data = await getAuth().createUserWithEmailAndPassword(
      email,
      password
    );
    const user = new User(data.user);
    currentUser = user;
    cl.doc(user.id).set(user);
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
  isCompleted?: boolean;
}): Promise<boolean> {
  const cl = getCollection();
  try {
    if (userData.displayName && userData.username) {
      userData.isCompleted = true;
    } else {
      userData.isCompleted = false;
    }
    await cl.doc(getData().id).update(userData);
    const user = await getUserData();
    currentUser = new User(user.data());
    return true;
  } catch (e) {
    return false;
  }
}

async function updateUserPhoto(userData: {
  photoURL: string | null;
}): Promise<boolean> {
  const cl = getCollection();
  try {
    const user = await cl.doc(getData().id).update(userData);
    return true;
  } catch (e) {
    return false;
  }
}

async function uploadProfilePhoto(
  imageUri: string,
  success: (snapshot: UploadTaskSnapshot) => void,
  error: (error: any) => void
) {
  const ext = imageUri.split(".").pop();
  const filename = `${currentUser.id}.${ext}`;
  firebase
    .storage()
    .ref(`profiles/${filename}`)
    .putFile(imageUri)
    // @ts-ignore
    .on(firebase.storage.TaskEvent.STATE_CHANGED, success, error);
}

async function loginUser(
  email: string,
  password: string
): Promise<boolean | User> {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    let user = await getUserData();
    currentUser = new User(user.data());
    return currentUser;
  } catch (e) {
    firebaseError(e);
    return false;
  }
}

function logout() {
  getAuth().signOut();
}

async function isUserLogged(): Promise<boolean> {
  if (firebase.auth()!.currentUser) {
    const user = await getUserData();
    currentUser = new User(user.data());

    if (user.exists) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

function getData() {
  return currentUser;
}

const UserAPI = {
  registerUser,
  updateUser,
  uploadProfilePhoto,
  updateUserPhoto,
  loginUser,
  isUserLogged,
  getData,
  logout
};

export default UserAPI;
