'use client';
import { useContext, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { firebase_app } from '../firebase/firebase.config';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getUserFromDB } from '../firebase/auth/signin';

const auth = getAuth(firebase_app);

const db = getFirestore(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const { userRef, errorGet } = await getUserFromDB(user);
        setUser(userRef);
      } else {
        // User is signed out
        setUser(null);
      }
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
