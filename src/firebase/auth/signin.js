import { auth, db } from '../firebase.config';

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

// Email and Password Auth
export async function signInWithEmailAndPasswordAuth(email, password) {
  var userRef = null;
  var errorSignIn = null;

  try {
    userRef = (await signInWithEmailAndPassword(auth, email, password)).user;
  } catch (e) {
    // Handle Errors here.
    const errorCode = e.code;
    const errorMessage = e.message;
    errorSignIn = errorMessage;
  }

  return { userRef, errorSignIn };
}

// GOOGLE AUTH
export async function signInWithGoogle() {
  var userRef = null;
  var errorSignIn = null;

  try {
    userRef = (await signInWithPopup(auth, GoogleProvider)).user;
  } catch (e) {
    // Handle Errors here.
    const errorCode = e.code;
    const errorMessage = e.message;
    errorSignIn = errorMessage;
  }

  return { userRef, errorSignIn };
}

// GITHUB AUTH
export async function signInWithGithub() {
  var userRef = null;
  var errorSignIn = null;

  try {
    userRef = (await signInWithPopup(auth, GithubProvider)).user;
  } catch (e) {
    // Handle Errors here.
    const errorCode = e.code;
    const errorMessage = e.message;
    errorSignIn = errorMessage;
  }

  return { userRef, errorSignIn };
}
