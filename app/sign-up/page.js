'use client'; // This is a client component
import styles from './signUp.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// ASSETS
import { useAuthContext } from '@/src/context/AuthContext';
import { AiOutlineGoogle, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import {
  signUpWithGithub,
  signUpWithGoogle,
  signUpWithEmailAndPassword,
} from '@/src/firebase/auth/signup';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Navigation
  const router = useRouter();

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const { error } = await signUpWithEmailAndPassword(email, password);

    if (error) {
      //TODO: Handle Error here
      console.log(error);
    } else {
      // Perform navigation
      router.push('/sign-up/complete-info');
    }
  };
  const handleSignInWithGoogle = async (event) => {
    const { error } = await signUpWithGoogle();

    if (error) {
      //TODO: Handle Error here
      console.log(error);
    } else {
      // Perform navigation
      router.push('/sign-up/complete-info');
    }
  };
  const handleSignInWithGithub = async (event) => {
    const { error } = await signUpWithGithub();
    if (error) {
      //TODO: Handle Error here
      console.log(error);
    }
    // Perform navigation
    router.push('/sign-up/complete-info');
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
        <h3 className={styles.formTitle}>Sign Up</h3>

        <label htmlFor='username' className={styles.labelText}>
          Username
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
