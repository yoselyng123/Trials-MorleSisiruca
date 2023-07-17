'use client';
import React, { useState } from 'react';
import styles from './chat.module.css';
import Image from 'next/image';
import { AiOutlineSend } from 'react-icons/ai';
import { useAuthContext } from '@/src/context/AuthContext';

function Chat({ chatInfo }) {
  const { user } = useAuthContext();

  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  const [newMessage, setNewMessage] = useState('');

  const handleSenderOrReceiver = (message) => {
    if (message.senderId === user.uid) {
      console.log('sender');
      return 'sender';
    } else {
      console.log('receiver');
      return 'receiver';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topHeader}>
        <Image
          width={40}
          height={40}
          className={styles.personalAvatar}
          src={
            chatInfo.userInfo?.profilePic
              ? chatInfo.userInfo.profilePic
              : defaultAvatar
          }
        />
        <p className={styles.nameText}>
          {chatInfo.userInfo.role === 'Professional'
            ? `${chatInfo.userInfo.name} ${chatInfo.userInfo.lastname}`
            : `${chatInfo.userInfo.name}`}
        </p>
      </div>
      <div className={styles.textsWrapper}>
        {chatInfo.chat.messages.map((message, index) => (
          <div
            className={
              handleSenderOrReceiver(message) === 'sender'
                ? styles.senderContainer
                : styles.receiverContainer
            }
            key={index}
          >
            <p className={styles.message}>{message.text}</p>
          </div>
        ))}
      </div>
      {chatInfo.chat.chatEnabled && (
        <div className={styles.messageSenderWrapper}>
          <input
            className={styles.messageInput}
            placeholder='Type your message here...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className={styles.sendIconWrapper}>
            <AiOutlineSend color='rgba(0,0,0,0.5)' size={20} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
