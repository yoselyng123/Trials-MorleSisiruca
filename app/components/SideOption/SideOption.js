import Link from 'next/link';
import styles from './sideOption.module.css';
import { useEffect, useState } from 'react';
import { getCompanyNotificationsByState } from '@/src/firebase/firestore/notifications';
import { useAuthContext } from '@/src/context/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/src/firebase/firebase.config';

function SideOption({ title, icon, primary, link }) {
  const { user } = useAuthContext();

  const [countNew, setCountNew] = useState(0);

  useEffect(() => {
    if (user && title === 'Notifications') {
      const q = query(
        collection(db, 'Notifications'),
        where('receiver', '==', user.uid)
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          var counter = 0;
          querySnapshot.forEach((doc) => {
            if (doc.data().state === 'Nuevo') {
              counter = counter + 1;
            }
          });

          setCountNew(counter);
        },
        (error) => {
          console.log('Error getting document:', error);
        }
      );

      return unsubscribe;
    }
  }, [user]);

  return (
    <Link
      className={primary ? styles.container2 : styles.container}
      href={link}
    >
      <div className={styles.leftContainer}>
        <div className={styles.iconWrapper}>
          {title === 'Notifications' && countNew > 0 && (
            <div className={styles.counterNumberWrapper}>
              <p className={styles.numberText}>{countNew}</p>
            </div>
          )}
          {icon}
        </div>
        <p className={primary ? styles.text2 : styles.text}>{title}</p>
      </div>
    </Link>
  );
}

export default SideOption;
