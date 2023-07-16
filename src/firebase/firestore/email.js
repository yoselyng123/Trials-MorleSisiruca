import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.config';

export async function sendEmail(email) {
  var errorAddData = null;
  var docRef = null;

  try {
    docRef = await addDoc(collection(db, 'mail'), email);
  } catch (e) {
    errorAddData = e.message;
  }

  return { errorAddData, docRef };
}
