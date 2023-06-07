'use client';
import { useAuthContext } from '@/src/context/AuthContext';
import styles from './page.module.css';
import { auth } from '@/src/firebase/firebase.config';
import { useEffect } from 'react';
import JobOffer from './components/JobOffer/JobOffer';

export default function Home() {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <JobOffer />
        <JobOffer />
        <JobOffer />
      </div>
    </main>
  );
}
