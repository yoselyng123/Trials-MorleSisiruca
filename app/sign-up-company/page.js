'use client';
import styles from './SignUpCompany.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmailAndPasswordCompany } from '@/src/firebase/auth/signup';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../components/Map/Map';
import Places from '../components/Places/Places';

function page() {
  const router = useRouter();
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   libraries: ['places'],
  // });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [mapCoordinates, setMapCoordinates] = useState({});

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
        location,
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
          Location
        </label>
        <input
          type='text'
          placeholder="Enter your company's location"
          id='location'
          className={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type='submit' className={styles.btnSignUp}>
          Sign up
        </button>
      </form>
    </div>
  );
}

export default page;
