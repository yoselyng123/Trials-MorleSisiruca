'use client';
import React, { useEffect, useState } from 'react';
import styles from './chatListElement.module.css';
import Image from 'next/image';
import ReactTimeago from 'react-timeago';
import { getUserByID } from '@/src/firebase/auth/signup';
import { useAuthContext } from '@/src/context/AuthContext';

function ChatListElement({ chat, setModalOpen, setClickedChat }) {
  const [userInfo, setUserInfo] = useState('');

  const { user } = useAuthContext();

  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  useEffect(() => {
    if (user) {
      handleGetUserInfo();
    }
  }, [user]);

  const handleGetUserInfo = async () => {
    if (user.role === 'Company') {
      const { userRef, errorGet } = await getUserByID(
        chat.data.participants.uid2
      );

      if (userRef) {
        setUserInfo(userRef);
      }
    } else {
      const { userRef, errorGet } = await getUserByID(
        chat.data.participants.uid1
      );

      if (userRef) {
        setUserInfo(userRef);
      }
    }
  };

  const handleShowFullChat = () => {
    setModalOpen(true);
    setClickedChat({
      chat,
      userInfo,
    });
  };

  if (userInfo) {
    return (
      <div className={styles.container} onClick={handleShowFullChat}>
        <div className={styles.leftContainer}>
          <Image
            height={40}
            width={40}
            src={userInfo?.profilePic ? userInfo.profilePic : defaultAvatar}
            className={styles.personalAvatar}
          />
          <div className={styles.midContainer}>
            <p className={styles.name}>
              {userInfo.role === 'Professional'
                ? `${userInfo.name} ${userInfo.lastname}`
                : `${userInfo.name}`}
            </p>

            <p className={styles.message}>
              {chat.messages[chat.messages.length - 1].text
                .substring(0, 30)
                .concat('...')}
            </p>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <ReactTimeago
            date={chat.messages[chat.messages.length - 1].timestamp}
            className={styles.notificationTime}
          />
        </div>
      </div>
    );
  }
}

export default ChatListElement;
