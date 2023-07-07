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
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

// Read users with role Company
export async function getUserByRole(role) {
  let companyListRef = [];
  let errorGet = null;

  try {
    const q = query(collection(db, 'Users'), where('role', '==', role));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      companyListRef.push(doc.data());
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { companyListRef, errorGet };
}
