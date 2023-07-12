'use client'; // This is a client component
import styles from './signUp.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// ASSETS
import { AiOutlineGoogle, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import {
  signUpWithEmailAndPassword,
  signUpWithGoogle,
  signUpWithGithub,
} from '@/src/firebase/auth/signup';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Navigation
  const router = useRouter();

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const { userRef, errorSignUp } = await signUpWithEmailAndPassword(
      email,
      password
    );

    if (userRef) {
      router.push('/sign-up/complete-info');
    } else {
      console.log('NO HAY USERREF EN SIGNUP');
    }
  };
  const handleSignInWithGoogle = async (event) => {
    event.preventDefault();
    const { userRef, errorSignUp } = await signUpWithGoogle();

    if (userRef) {
      router.push('/sign-up/complete-info');
    } else {
      console.log('NO HAY USERREF EN SIGNUP');
    }
  };
  const handleSignInWithGithub = async (event) => {
    event.preventDefault();
    const { userRef, errorSignUp } = await signUpWithGithub();

    if (userRef) {
      router.push('/sign-up/complete-info');
    } else {
      console.log('NO HAY USERREF EN SIGNUP');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
        <h3 className={styles.formTitle}>Sign Up</h3>

        <label htmlFor='username' className={styles.labelText}>
          Email
        </label>
        <input
          type='text'
          placeholder='example@gmail.com'
          id='username'
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
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
        />

        <button type='submit' className={styles.btnSignUp}>
          Sign up
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

export default SignUpPage;
