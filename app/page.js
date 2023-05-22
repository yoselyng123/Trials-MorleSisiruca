'use client';
import { useAuthContext } from '@/src/context/AuthContext';
import styles from './page.module.css';
import { auth } from '@/src/firebase/firebase.config';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <main className={styles.main}></main>;
}
