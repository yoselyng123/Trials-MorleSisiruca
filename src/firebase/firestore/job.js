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
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

// Create Job
export async function createJob(
  title,
  description,
  requiredExperience,
  state,
  expertiseAreas,
  jobCategories,
  location,
  companyID,
  jobType,
  applicantLimit,
  paymentRange,
  experienceLevel
) {
  var errorAddData = null;
  var docRef = null;

  const currentDate = new Date();
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedDate = `${
    month[currentDate.getMonth()]
  }  ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  try {
    docRef = await addDoc(collection(db, 'jobOffers'), {
      title,
      description,
      requiredExperience,
      state,
      expertiseAreas,
      jobCategories,
      location,
      companyID,
      jobType,
      applicantLimit,
      paymentRange,
      experienceLevel,
      applicants: [],
      publishedDate: formattedDate,
    });

    console.log(docRef);
  } catch (e) {
    errorAddData = e.message;
  }

  return { errorAddData, docRef };
}

// Read Job
export async function getJob(job) {
  let docRef = null;
  let errorGet = null;

  try {
    const docSnap = await getDoc(doc(db, 'jobOffers', job.id));
    if (docSnap.exists()) {
      docRef = { id: docSnap.id, ...docSnap.data() };
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No job in db!');
    }
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { docRef, errorGet };
}

// Read all Jobs
export async function getJobsList() {
  let jobsListRef = [];
  let errorGet = null;

  try {
    const querySnapshot = await getDocs(collection(db, 'jobOffers'));
    querySnapshot.forEach((doc) => {
      jobsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { jobsListRef, errorGet };
}

// Read Jobs by State
export async function getJobsListByState(state) {
  let jobsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'jobOffers'),
      where('state', '==', state.toLowerCase())
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      jobsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { jobsListRef, errorGet };
}

// Read Jobs by Company
export async function getJobsListByCompany(user) {
  let jobsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'jobOffers'),
      where('companyID', '==', user.uid)
    );

    console.log(user.uid);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      jobsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }
  console.log(jobsListRef);

  return { jobsListRef, errorGet };
}

// Update Job
export async function updateJob(
  job,
  title,
  description,
  requiredExperience,
  state,
  expertiseAreas,
  jobCategories,
  location,
  jobType,
  applicantLimit,
  paymentRange,
  experienceLevel
) {
  var errorUpdate = null;
  var jobRefUpdate = null;
  var errorGetUpdate = null;
  // update user info to firestore db
  try {
    await updateDoc(
      doc(db, 'jobOffers', job.id),
      {
        title,
        description,
        requiredExperience,
        state,
        expertiseAreas,
        jobCategories,
        location,
        jobType,
        applicantLimit,
        paymentRange,
        experienceLevel,
      },
      {
        merge: true,
      }
    );

    const { docRef, errorGet } = await getJob(job);
    jobRefUpdate = docRef;
    errorGetUpdate = errorGet;
  } catch (e) {
    errorUpdate = e.message;
    console.log(errorUpdate);
  }

  return { jobRefUpdate, errorUpdate, errorGetUpdate };
}

// Delete Job
export async function deleteJob(job) {
  var deleteError = null;
  try {
    await deleteDoc(doc(db, 'jobOffers', job.id));
  } catch (error) {
    deleteError = error.message;
  }
  return deleteError;
}
