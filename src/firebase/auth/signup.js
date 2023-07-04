import { auth, db } from '../firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const GoogleProvider = new GoogleAuthProvider();

const GithubProvider = new GithubAuthProvider();

const storage = getStorage();

// Email and Password Auth
export async function signUpWithEmailAndPassword(email, password) {
  var userRef = null;
  var errorSignUp = null;
  try {
    userRef = (await createUserWithEmailAndPassword(auth, email, password))
      .user;
    console.log('USER CREATED SUCCESSFULLY');
  } catch (e) {
    errorSignUp = e;
    console.log(errorSignUp);
  }

  return { userRef, errorSignUp };
}

// Email and Password Auth
export async function signUpWithEmailAndPasswordCompany(
  email,
  password,
  name,
  location,
  webUrl
) {
  var userRef = null;
  var errorSignUp = null;
  try {
    userRef = (await createUserWithEmailAndPassword(auth, email, password))
      .user;
    console.log('USER CREATED SUCCESSFULLY');

    await setDoc(
      doc(db, 'Users', userRef.uid),
      {
        email: userRef.email,
        uid: userRef.uid,
        name,
        location,
        webUrl,
        role: 'Company',
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorSignUp = e;
    console.log(errorSignUp);
  }

  return { userRef, errorSignUp };
}

// GOOGLE AUTH
export async function signUpWithGoogle() {
  var userRef = null;
  var errorSignUp = null;

  try {
    userRef = (await signInWithPopup(auth, GoogleProvider)).user;
  } catch (e) {
    // Handle Errors here.
    const errorCode = e.code;
    const errorMessage = e.message;
    errorSignUp = errorMessage;
  }

  return { userRef, errorSignUp };
}

// GITHUB AUTH
export async function signUpWithGithub() {
  var userRef = null;
  var errorSignUp = null;

  try {
    userRef = (await signInWithPopup(auth, GithubProvider)).user;
  } catch (e) {
    // Handle Errors here.
    const errorCode = e.code;
    const errorMessage = e.message;
    errorSignUp = errorMessage;
  }

  return { userRef, errorSignUp };
}

// Create user
export async function createUser(user) {
  var errorAddData = null;
  try {
    await setDoc(
      doc(db, 'Users', user.uid),
      {
        email: user.email,
        uid: user.uid,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorAddData = e.message;
  }

  return errorAddData;
}

// Read user
export async function getUser(user) {
  let userRef = null;
  let errorGet = null;

  try {
    const docSnap = await getDoc(doc(db, 'Users', user.uid));
    if (docSnap.exists()) {
      userRef = docSnap.data();
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No user in db!');
    }
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { userRef, errorGet };
}
// Update User Professional
export async function updateUserProfessional(
  user,
  name,
  lastname,
  description,
  jobCategories,
  listExpertiseAreas,
  phoneNumber,
  location,
  setLoading,
  file
) {
  setLoading(true);
  var errorUpdate = null;
  var userRefUpdate = null;
  var errorGetUpdate = null;
  // update info in firestore db

  try {
    if (file) {
      const photoURL = await uploadImage(file, user, setLoading);
      await updateDoc(
        doc(db, 'Users', user.uid),
        {
          email: user.email,
          uid: user.uid,
          name,
          lastname,
          description,
          jobCategories,
          listExpertiseAreas,
          phoneNumber,
          location,
          profilePic: photoURL,
          role: 'Professional',
        },
        {
          merge: true,
        }
      );
    } else {
      await updateDoc(
        doc(db, 'Users', user.uid),
        {
          email: user.email,
          uid: user.uid,
          name,
          lastname,
          description,
          jobCategories,
          listExpertiseAreas,
          phoneNumber,
          location,
          role: 'Professional',
        },
        {
          merge: true,
        }
      );
    }

    const { userRef, errorGet } = await getUser(user);
    userRefUpdate = userRef;
    errorGetUpdate = errorGet;
    setLoading(false);
  } catch (e) {
    errorUpdate = e;
    console.log(e);
  }

  return { userRefUpdate, errorUpdate, errorGetUpdate };
}

// Update User Company
export async function updateUserCompany(
  user,
  name,
  location,
  webUrl,
  listExpertiseAreas,
  companySize,
  setLoading,
  file
) {
  var errorUpdate = null;
  var userRefUpdate = null;
  var errorGetUpdate = null;
  setLoading(true);
  // update user info to firestore db
  try {
    if (file) {
      const photoURL = await uploadImage(file, user, setLoading);
      await updateDoc(
        doc(db, 'Users', user.uid),
        {
          email: user.email,
          uid: user.uid,
          name,
          location,
          webUrl,
          listExpertiseAreas,
          companySize,
          profilePic: photoURL,
          role: 'Company',
        },
        {
          merge: true,
        }
      );
    } else {
      await updateDoc(
        doc(db, 'Users', user.uid),
        {
          email: user.email,
          uid: user.uid,
          name,
          location,
          webUrl,
          listExpertiseAreas,
          companySize,
          role: 'Company',
        },
        {
          merge: true,
        }
      );
    }

    const { userRef, errorGet } = await getUser(user);
    userRefUpdate = userRef;
    errorGetUpdate = errorGet;

    setLoading(false);
  } catch (e) {
    errorUpdate = e.message;
  }

  return { userRefUpdate, errorUpdate, errorGetUpdate };
}

// Storage Images
export async function uploadImage(file, user, setLoading) {
  const fileRef = ref(storage, `profileImages/${user.uid}.png`);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  return photoURL;
}

// Read Company
export async function getCompany(id) {
  let userRef = null;
  let errorGet = null;

  try {
    const docSnap = await getDoc(doc(db, 'Users', id));
    if (docSnap.exists()) {
      userRef = docSnap.data();
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No user in db!');
    }
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { userRef, errorGet };
}
