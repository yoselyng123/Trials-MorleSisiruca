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

// Notification is an object with the following structure:
// {
//     message: "Esta es una nueva notificacion",
//     title: "Nuevo CV",
//     state: "Nuevo" || "Leido" || "Descartado",
//     sender: userId
//     receiver: companyId
//     created: 2016-08-08 08:08:08
//     jobOfferId: jobOfferId
// }

// Create Job Application
export async function createNotification(notification) {
  var errorAddData = null;
  var docRef = null;

  try {
    docRef = await addDoc(collection(db, 'Notifications'), notification);
  } catch (e) {
    errorAddData = e.message;
  }

  return { errorAddData, docRef };
}

// Get Notifications by State
export async function getCompanyNotificationsByState(state, companyId) {
  let notificationsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'Notifications'),
      where('state', '==', state),
      where('receiver', '==', companyId),
      orderBy('created')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      notificationsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { notificationsListRef, errorGet };
}
// Get All Notifications of Company
export async function getCompanyNotifications(companyId) {
  let notificationsListRef = [];
  let errorGet = null;

  try {
    const q = query(
      collection(db, 'Notifications'),
      where('receiver', '==', companyId),
      orderBy('created')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      notificationsListRef.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { notificationsListRef, errorGet };
}

// Update Notification By ID
export async function updateNotificationById(notificationId, state) {
  var errorUpdate = null;

  try {
    await updateDoc(
      doc(db, 'Notifications', notificationId),
      {
        state,
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

// Get Notification By ID
export async function getNotificationById(notificationId) {
  let notificationRef = null;
  let errorGet = null;

  try {
    const docSnap = await getDoc(doc(db, 'Notifications', notificationId));
    if (docSnap.exists()) {
      notificationRef = docSnap.data();
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No user in db!');
    }
  } catch (e) {
    errorGet = e;
    console.log(errorGet);
  }

  return { notificationRef, errorGet };
}

export async function deleteNotificationById(notificationId) {
  var deleteError = null;
  try {
    await deleteDoc(doc(db, 'Notifications', notificationId));
  } catch (error) {
    deleteError = error.message;
  }
  return deleteError;
}
