'use client';
import React, { useState } from 'react';
import styles from './customMessageForm.module.css';
import InputBox from '../InputBox/InputBox';
import ActionBtn from '../ActionBtn/ActionBtn';
import {
  checkExistingChat,
  createChat,
  createMessage,
} from '@/src/firebase/firestore/chats';
import { useAuthContext } from '@/src/context/AuthContext';

function CustomMessageForm({ jobOffer, setModalOpen, setFinishUpdate }) {
  const { user } = useAuthContext();

  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    for (let i = 0; i < jobOffer.applicants.length; i++) {
      const applicant = jobOffer.applicants[i];

      const found = await checkExistingChat(
        checkExistingChat(user.uid, applicant)
      );

      if (found) {
        console.log(`Chat already exists for user ${applicant}}`);
      } else {
        const { errorAddData, docRef } = await createChat(user.uid, applicant);
        if (docRef) {
          const { messageDocRef, errorAdd } = await createMessage(
            docRef.id,
            message,
            user.uid
          );
        }
      }
    }
    setFinishUpdate(true);
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <InputBox
        value={message}
        setValue={setMessage}
        label='Message'
        isTextArea={true}
      />
      <div>
        <ActionBtn title='Send' actionFunction={() => handleSendMessage()} />
      </div>
    </div>
  );
}

export default CustomMessageForm;
