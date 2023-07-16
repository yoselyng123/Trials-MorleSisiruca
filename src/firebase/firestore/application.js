import { firebase_app } from '../firebase.config';
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

// application is an object with the following structure:
// {
//     cv: "url",
//     userId: "user.uid",
//     jobOfferId: "jobOfferId",
//     companyId: "companyId",
//     stage: "new", // new | in process | closed
//     dateApplied: "24 June, 2022"
// }

// Create Job Application
export async function handleJobApply(application) {
  var errorAddData = null;
  var docRef = null;

  try {
    docRef = await addDoc(collection(db, 'Applications'), application);
    const jobRef = doc(db, 'jobOffers', application.jobOfferId);
    try {
      await updateDoc(jobRef, {
        applicants: arrayUnion(`${application.userId}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  } catch (e) {
    errorAddData = e.message;
  }

  return { errorAddData, docRef };
}

// Get Applications by JobOfferID

export async function getApplicationByJobOfferId(jobOfferId) {
  let applicationsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'Applications'),
      where('jobOfferId', '==', jobOfferId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      applicationsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { applicationsListRef, errorGet };
}

// Get Applications by UserID

export async function getApplicationByUserId(userId) {
  let applicationsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'Applications'),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      applicationsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { applicationsListRef, errorGet };
}

// Get Applications by CompanyID

export async function getApplicationByCompanyId(companyId) {
  let applicationsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'Applications'),
      where('companyId', '==', companyId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      applicationsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { applicationsListRef, errorGet };
}

//Update application Stage by ID
export async function updateApplicationStageById(applicationId, stage) {
  var errorUpdate = null;

  try {
    await updateDoc(
      doc(db, 'Applications', applicationId),
      {
        stage,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    errorUpdate = e.message;
  }

  return { errorUpdate };
}
