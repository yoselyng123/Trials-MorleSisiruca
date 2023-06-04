'use client'; // This is a client component
import { useState } from 'react';
import styles from './signIn.module.css';
import { useRouter } from 'next/navigation';
// ASSETS
import { AiOutlineGoogle, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import {
  signInWithEmailAndPasswordAuth,
  signInWithGithub,
  signInWithGoogle,
} from '@/src/firebase/auth/signin';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const { userRef, errorSignUp } = await signInWithEmailAndPasswordAuth(
      email,
      password
    );

    if (userRef) {
      router.push('/');
    } else {
      console.log('NO HAY USERREF EN SIGNIN');
    }
  };
  const handleSignInWithGoogle = async (event) => {
    event.preventDefault();
    const { userRef, errorSignUp } = await signInWithGoogle();

    if (userRef) {
      router.push('/');
    } else {
      console.log('NO HAY USERREF EN SIGNIN');
    }
  };
  const handleSignInWithGithub = async (event) => {
    event.preventDefault();
    const { userRef, errorSignUp } = await signInWithGithub();

    if (userRef) {
      router.push('/');
    } else {
      console.log('NO HAY USERREF EN SIGNIN');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
        <h3 className={styles.formTitle}>Sign In</h3>
        <label htmlFor='username' className={styles.labelText}>
          Username
        </label>
        <input
          type='text'
          placeholder='example@gmail.com'
          id='username'
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor='password' className={styles.labelText}>
          Password
        </label>
        <input
          type='password'
          placeholder='Password'
          id='password'
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type='submit' className={styles.btnSignUp}>
          Sign in
        </button>
        <div className={styles.socialWrapper}>
          <button className={styles.btnSocial} onClick={handleSignInWithGoogle}>
            <AiOutlineGoogle size={18} /> Google
          </button>
          <button className={styles.btnSocial} onClick={handleSignInWithGithub}>
            <AiFillGithub size={18} /> GitHub
          </button>
          <button className={styles.btnSocial}>
            <AiFillLinkedin size={18} /> Linkedin
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
