import { firebase_app, auth, db } from '../firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

const GoogleProvider = new GoogleAuthProvider();

const GithubProvider = new GithubAuthProvider();

export async function signUpWithEmailAndPassword(email, password) {
  let userRef = null;
  let errorSignUp = null;
  try {
    userRef = (await createUserWithEmailAndPassword(auth, email, password))
      .user;
    console.log('USER CREATED SUCCESSFULLY');
  } catch (e) {
    errorSignUp = e;
    console.log(errorSignUp);
  }

  // add user info to firestore db
  try {
    await setDoc(
      doc(db, 'Users', userRef.uid),
      {
        email: userRef.email,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorAddData = e.message;
  }

  return { userRef, errorSignUp, errorAddData };
}
// GOOGLE AUTH
export async function signUpWithGoogle() {
  var userRef = null;
  var errorSignUp = null;
  var errorAddData = null;

  await signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      // The signed-in user info.
      userRef = result.user;
    })
    .catch((e) => {
      // Handle Errors here.
      const errorCode = e.code;
      const errorMessage = e.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(e);
      // ...

      errorSignUp = errorMessage;
    });

  // add user info to firestore db
  try {
    await setDoc(
      doc(db, 'Users', userRef.uid),
      {
        email: userRef.email,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorAddData = e.message;
  }

  return { userRef, errorSignUp, errorAddData };
}

// GITHUB AUTH
export async function signUpWithGithub() {
  var userRef = null;
  var error = null;
  await signInWithPopup(auth, GithubProvider)
    .then((result) => {
      // The signed-in user info.
      userRef = result.user;
      console.log(userRef);
    })
    .catch((e) => {
      // Handle Errors here.
      const errorCode = e.code;
      const errorMessage = e.message;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(e);
      // ...
      error = e.message;
    });

  // add user info to firestore db
  try {
    await setDoc(
      doc(db, 'Users', userRef.uid),
      {
        email: userRef.email,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    console.log(e);
  }

  return { userRef, error };
}

// Update User info Professional
export async function updateUserProfessional(
  user,
  name,
  lastname,
  description,
  jobCategories
) {
  var errorUpdate = null;
  // update info in firestore db
  try {
    await updateDoc(
      doc(db, 'Users', user.uid),
      {
        email: user.email,
        name,
        lastname,
        description,
        jobCategories,
        role: 'Professional',
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorUpdate = e;
    console.log(e);
  }

  let docRef = doc(db, 'Users', user.uid);
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

  return { userRef, errorUpdate, errorGet };
}
// Update User info Company
export async function signUpWithEmailAndPasswordCompany(
  email,
  password,
  name,
  ubication,
  webUrl
) {
  let userRef = null;
  let errorSignUp = null;
  let errorAddData = null;
  try {
    userRef = (await createUserWithEmailAndPassword(auth, email, password))
      .user;
    console.log('USER CREATED SUCCESSFULLY');
  } catch (e) {
    errorSignUp = e;
    console.log(errorSignUp);
  }

  // add user info to firestore db
  try {
    await setDoc(
      doc(db, 'Users', userRef.uid),
      {
        email: userRef.email,
        name,
        ubication,
        webUrl,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorAddData = e.message;
  }

  return { userRef, errorSignUp, errorAddData };
}
