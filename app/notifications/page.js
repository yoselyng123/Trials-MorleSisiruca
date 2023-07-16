'use client';
import React, { useEffect, useState } from 'react';
import styles from './notifications.module.css';
import {
  getCompanyNotifications,
  getCompanyNotificationsByState,
  updateNotificationById,
} from '@/src/firebase/firestore/notifications';
import { useAuthContext } from '@/src/context/AuthContext';
import ReactTimeago from 'react-timeago';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/src/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';

function page() {
  const { user } = useAuthContext();

  const [notificationsList, setNotificationsList] = useState([]);
  const [newNotificationsList, setNewNotificationsList] = useState([]);

  const [countNew, setCountNew] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'Notifications'),
        where('receiver', '==', user.uid)
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          var notifications = [];
          var counter = 0;
          querySnapshot.forEach((doc) => {
            if (doc.data().state !== 'Descartado') {
              notifications.push({ id: doc.id, ...doc.data() });
            }
            console.log(doc.data().created);
            if (doc.data().state === 'Nuevo') {
              counter = counter + 1;
            }
          });
          notifications.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );

          setNotificationsList(notifications);
          setCountNew(counter);
        },
        (error) => {
          console.log('Error getting document:', error);
        }
      );

      return unsubscribe;
    }
  }, [user]);

  const handleClickNotification = async (notification) => {
    if (notification.state === 'Nuevo') {
      console.log('UPDATING...');
      await updateNotificationById(notification.id, 'Leido');
    }

    if (user.role === 'Company') {
      router.push(`/job-offers/${notification.jobOfferId}`);
    } else {
      router.push(`/my-applications`);
    }
  };

  const handleUpdateNotification = async (notification, e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    await updateNotificationById(notification.id, 'Descartado');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <p className={styles.title}>Notifications</p>
        <p className={styles.text}>You've got {countNew} notifications</p>
      </div>
      <div className={styles.notificationsWrapper}>
        {notificationsList.length > 0 ? (
          notificationsList.map((notification, index) => (
            <div
              className={styles.notificationContainer}
              key={index}
              onClick={() => handleClickNotification(notification)}
            >
              {notification.state === 'Nuevo' && (
                <div className={styles.circle} />
              )}
              <div className={styles.rightContainer}>
                <div className={styles.topSection}>
                  <p className={styles.notificationTitle}>
                    {notification.title}
                  </p>
                  <ReactTimeago
                    date={notification.created}
                    className={styles.notificationTime}
                  />
                </div>
                <p className={styles.notificationText}>
                  {notification.message}
                </p>
              </div>
              <div
                className={styles.IconContainer}
                onClick={(e) => handleUpdateNotification(notification, e)}
              >
                <AiFillDelete size={18} color='rgba(0,0,0,0.5)' />
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResultText}>No notifications</p>
        )}
      </div>
    </div>
  );
}

export default page;
