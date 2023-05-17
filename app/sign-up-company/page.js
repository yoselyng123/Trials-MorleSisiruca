'use client';
import styles from './SignUpCompany.module.css';
import { useState } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signUpWithEmailAndPasswordCompany } from '@/src/firebase/auth/signup';

function page() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ubication, setUbication] = useState('');
  const [webUrl, setWebUrl] = useState('');

  const userInputValidations = () => {
    //TODO: HACER VALIDACIONES
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const { userRef, errorSignUp, errorAddData } =
      await signUpWithEmailAndPasswordCompany(
        email,
        password,
        name,
        ubication,
        webUrl
      );

    if (errorAddData) {
      //TODO: Handle Error here
      console.log(errorAddData);
    } else {
      // Perform navigation
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
        <h3 className={styles.formTitle}>Sign Up</h3>
        <label htmlFor='password' className={styles.labelText}>
          Email
        </label>
        <input
          type='email'
          placeholder='example@gmail.com'
          id='email'
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password' className={styles.labelText}>
          Password
        </label>
        <input
          type='password'
          placeholder='password'
          id='password'
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='username' className={styles.labelText}>
          Company Name
        </label>
        <input
          type='text'
          placeholder='name'
          id='name'
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='username' className={styles.labelText}>
          Web URL
        </label>
        <input
          type='text'
          placeholder='https://www.example.com/'
          id='webUrl'
          className={styles.input}
          value={webUrl}
          onChange={(e) => setWebUrl(e.target.value)}
        />
        <label htmlFor='username' className={styles.labelText}>
          Ubication
        </label>
        <input
          type='text'
          placeholder='ubication'
          id='ubication'
          className={styles.input}
          value={ubication}
          onChange={(e) => setUbication(e.target.value)}
        />

        <button type='submit' className={styles.btnSignUp}>
          Sign up
        </button>
      </form>
    </div>
  );
}

export default page;
