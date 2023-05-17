import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const GoogleProvider = new GoogleAuthProvider();

const GithubProvider = new GithubAuthProvider();

export const getUserFromDB = async (result) => {
  // get user info from firestore db
  let docRef = doc(db, 'Users', result.uid);
  let userRef = null;
  let errorGet = null;

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      userRef = docSnap.data();
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { userRef, errorGet };
};

export async function signInWitnEmailAndPassword(email, password) {
  let result = null,
    error = null;
  try {
    result = (await signInWithEmailAndPassword(auth, email, password)).user;
    console.log('USER SUCCESSFULLY SIGNED IN');
  } catch (e) {
    error = e;
    console.log(error);
  }

  return { error };
}

// GOOGLE AUTH
export async function signInWithGoogle() {
  var result = null;
  var errorSignIn = null;

  await signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      // The signed-in user info.
      result = result.user;
    })
    .catch((e) => {
      // Handle Errors here.
      const errorCode = e.code;
      const errorMessage = e.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(e);
      // ...

      errorSignIn = errorMessage;
    });

  return { errorSignIn };
}

// GITHUB AUTH
export async function signInWithGithub() {
  var result = null;
  var errorSignIn = null;
  await signInWithPopup(auth, GithubProvider)
    .then((result) => {
      // The signed-in user info.
      result = result.user;
      console.log(userRef);
    })
    .catch((e) => {
      // Handle Errors here.
      const errorCode = e.code;
      const errorMessage = e.message;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(e);
      // ...
      errorSignIn = e.message;
    });

  return { errorSignIn };
}
