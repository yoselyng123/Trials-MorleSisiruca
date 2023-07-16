import React, { useState } from 'react';
import styles from './emailForm.module.css';
import InputBox from '../InputBox/InputBox';
import ActionBtn from '../ActionBtn/ActionBtn';
import { sendEmail } from '@/src/firebase/firestore/email';
import { useAuthContext } from '@/src/context/AuthContext';

function EmailForm({ userInfo }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { user } = useAuthContext();

  const handleSendEmail = async () => {
    const email = {
      to: [userInfo.email],
      message: {
        subject: subject,
        text: message,
        html: message,
      },
      from: user.email,
    };

    const { errorAddData, docRef } = await sendEmail(email);

    if (docRef) {
      alert('EMAIL SENT...');
    } else {
      alert('SOMETHING BAD HAPPENED');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.emailForm}>
        <div>
          <InputBox label='Subject' value={subject} setValue={setSubject} />
        </div>
        <InputBox
          label='Message'
          value={message}
          setValue={setMessage}
          isTextArea={true}
        />
      </div>
      <div className={styles.btnWrapper}>
        <ActionBtn title='Send' actionFunction={() => handleSendEmail()} />
      </div>
    </div>
  );
}

export default EmailForm;
