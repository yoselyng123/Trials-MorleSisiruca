'use client';
import { useAuthContext } from '@/src/context/AuthContext';
import ActionBtn from './components/ActionBtn/ActionBtn';
import styles from './page.module.css';
import { auth } from '@/src/firebase/firebase.config';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <main className={styles.main}>
      <div className={styles.btnWrapper}>
        <ActionBtn title='Sign In' link='/sign-in' primary={true} />
        <ActionBtn title='Sign Up' link='/sign-up' />
        <ActionBtn title='Sign Up Empresa' link='/sign-up-company' />
        {user ? (
          <button className={styles.btnSignUp} onClick={() => auth.signOut()}>
            Log out
          </button>
        ) : null}
      </div>

      {user && user.name && (
        <div>
          <p>{user.name}</p>
        </div>
      )}
    </main>
  );
}
