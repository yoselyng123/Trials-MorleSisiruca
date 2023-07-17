import { db, firebase_app } from '../firebase.config';
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
  setDoc,
  or,
  orderBy,
} from 'firebase/firestore';

const getCurrentDateTime = () => {
  var now = new Date();

  var year = now.getFullYear();

  var month = now.getMonth() + 1; // JavaScript months are 0-11
  month = (month < 10 ? '0' : '') + month; // add a zero if it's only one digit

  var day = now.getDate();
  day = (day < 10 ? '0' : '') + day; // add a zero if it's only one digit

  var hour = now.getHours();
  hour = (hour < 10 ? '0' : '') + hour; // add a zero if it's only one digit

  var minute = now.getMinutes();
  minute = (minute < 10 ? '0' : '') + minute; // add a zero if it's only one digit

  var second = now.getSeconds();
  second = (second < 10 ? '0' : '') + second; // add a zero if it's only one digit

  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
};

// Create new Chat
export async function createChat(uid1, uid2) {
  var errorAddData = null;
  var docRef = null;

  try {
    docRef = await addDoc(collection(db, 'Chats'), {
      participants: { uid1, uid2 },
      chatEnabled: false,
    });
  } catch (e) {
    errorAddData = e.message;
  }

  return { errorAddData, docRef };
}

// Create new Message
export async function createMessage(chatId, message, senderId) {
  var errorAdd = null;
  var messageDocRef = null;
  try {
    const messagesRef = collection(db, `/Chats/${chatId}/messages`);
    messageDocRef = await addDoc(messagesRef, {
      text: message,
      senderId: senderId,
      timestamp: getCurrentDateTime(),
    });
  } catch (error) {
    errorAdd = error.message;
  }

  return { messageDocRef, errorAdd };
}

// Get Chat and Messages
export async function getChatsAndMessages(userId) {
  var errorGet = null;
  var userChats = [];
  try {
    const chatsQuery = query(
      collection(db, 'Chats'),
      or(
        where('participants.uid1', '==', userId),
        where('participants.uid2', '==', userId)
      )
    );

    const chatsSnapshot = await getDocs(chatsQuery);

    for (const doc of chatsSnapshot.docs) {
      const messagesQuery = query(
        collection(db, `Chats/${doc.id}/messages`),
        orderBy('timestamp')
      );

      const messagesSnapshot = await getDocs(messagesQuery);

      var messagesRef = [];
      messagesSnapshot.forEach((doc) => {
        messagesRef.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const chatData = {
        id: doc.id,
        data: doc.data(),
        messages: messagesRef,
      };

      userChats.push(chatData);
    }
  } catch (error) {
    errorGet = error.message;
    console.log(errorGet);
  }
  return userChats;
}

// Check if chat exists
export async function checkExistingChat(user1Id, user2Id) {
  var found = null;

  const chatsRef = collection(db, 'Chats');
  const q = query(
    chatsRef,
    where('participants.uid1', '==', `${user1Id}`),
    where('participants.uid2', '==', `${user2Id}`)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    // no existing chat found
    console.log('chat not found');
    found = false;
  } else {
    // chat already exists
    console.log('chat found');
    found = true;
  }

  return found;
}
