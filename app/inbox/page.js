'use client';
import React, { useEffect, useState } from 'react';
import styles from './inbox.module.css';
import ChatListElement from '../components/ChatListElement/ChatListElement';
import { getChatsAndMessages } from '@/src/firebase/firestore/chats';
import { useAuthContext } from '@/src/context/AuthContext';
import Modal from '../components/Modal/Modal';
import Chat from '../components/Chat/Chat';

function page() {
  const { user } = useAuthContext();
  const [chatList, setChatList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedChat, setClickedChat] = useState(null);

  useEffect(() => {
    if (user) {
      handleGetChatsAndMessages();
    }
  }, [user]);

  const handleGetChatsAndMessages = async () => {
    const userChats = await getChatsAndMessages(user.uid);

    if (userChats) {
      setChatList(userChats);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContainer}>
          <h4 className={styles.pageTitle}>Inbox</h4>
          <div className={styles.chatsWrapper}>
            {chatList.length > 0 ? (
              chatList.map((chat, index) => (
                <ChatListElement
                  chat={chat}
                  key={index}
                  setModalOpen={setModalOpen}
                  setClickedChat={setClickedChat}
                />
              ))
            ) : (
              <p className={styles.noResultText}>No messages</p>
            )}
          </div>
        </div>
        {/* Modal */}
        {modalOpen && clickedChat && (
          <Modal
            setIsOpen={setModalOpen}
            modalContent={<Chat chatInfo={clickedChat} />}
            overWriteStyleModalContent={{
              padding: '0px',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default page;
