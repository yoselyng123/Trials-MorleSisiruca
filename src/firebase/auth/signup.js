import { auth, db } from '../firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

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
  educationList,
  jobExperienceList,
  adjCvList,
  file
) {
  var errorUpdate = null;
  var userRefUpdate = null;
  var errorGetUpdate = null;
  // update info in firestore db
  setLoading(true);
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
          educationList,
          jobExperienceList,
          adjCvList,
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
          educationList,
          jobExperienceList,
          adjCvList,
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
  } catch (e) {
    errorUpdate = e.message;
  }

  return { userRefUpdate, errorUpdate, errorGetUpdate };
}

// Storage Images
export async function uploadImage(file, user, setLoading) {
  const fileRef = ref(
    storage,
    `profileImages/${user.uid}_${new Date().toISOString()}.png`
  );
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);
  console.log(photoURL);
  return photoURL;
}
// Storage PDF
export async function uploadPDF(file, user, setLoading, updateCVList) {
  const fileName = `cvs/${user.uid}_${new Date().toISOString()}.pdf`;

  const fileRef = ref(storage, fileName);
  await uploadBytes(fileRef, file);

  const cvUrl = await getDownloadURL(fileRef);

  // Update Firestore record
  const userRef = doc(db, 'Users', user.uid);

  await updateDoc(userRef, {
    adjCvList: arrayUnion(cvUrl),
  });

  // Update local state
  updateCVList((prevList) => [...prevList, cvUrl]);
}

export async function deletePDF(
  user,
  cvURL,
  setLoading,
  adjCvList,
  setAdjCvList
) {
  // Get the file reference from the URL
  const fileRef = ref(storage, cvURL);

  // Delete the file
  deleteObject(fileRef)
    .then(async () => {
      // Remove the fileUrl from CVList
      const updatedCVList = adjCvList.filter((url) => url !== cvURL);
      setAdjCvList(updatedCVList);

      // Delete the file URL from Firestore
      const userRef = doc(db, 'Users', user.uid); // Assuming 'users' is your collection and userId is the ID of the document
      await updateDoc(userRef, {
        adjCvList: arrayRemove(cvURL), // Assuming 'adjCvList' is your field
      });
      alert('File deleted successfully');
    })
    .catch((error) => {
      console.error('Failed to delete file', error);
    });
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
