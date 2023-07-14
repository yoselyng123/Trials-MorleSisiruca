'use client';
import { useContext, createContext, useState, useEffect } from 'react';
import { createUser, getUser } from '../firebase/auth/signup';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase.config';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const { userRef, errorGet } = await getUser(user);
        if (userRef) {
          const unsubscribeFirestore = onSnapshot(
            doc(db, 'Users', userRef.uid),
            (snapshot) => {
              setUser({ uid: userRef.uid, ...snapshot.data() });
            }
          );
          // Return cleanup function for Firestore listener
          return () => unsubscribeFirestore();
        } else {
          const errorAddData = await createUser(user);
          if (!errorAddData) {
            setUser({
              email: user.email,
              uid: user.uid,
            });
            router.push('/sign-up/complete-info');
          }
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
