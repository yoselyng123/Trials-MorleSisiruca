'use client';
import styles from './profile.module.css';
import { Avatar } from '@mui/material';
import { BiChevronRight } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import ActionBtn from '../components/ActionBtn/ActionBtn';
import InputBox from '../components/InputBox/InputBox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/src/context/AuthContext';
import { updateUserCompany } from '@/src/firebase/auth/signup';

function page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [webUrl, setWebUrl] = useState('');

  const router = useRouter();

  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      setName(user.name);
      setEmail(user.email);
      setLocation(user.location);
      setWebUrl(user.webUrl);
    }
  }, []);

  const inputValidations = () => {
    // TODO: input validations
    return true;
  };

  const handleUpdateUserInfo = () => {
    if (inputValidations()) {
      updateUserCompany(user, name, location, webUrl);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <div className={styles.topLeftWrapper}>
          <p className={styles.pageTitleTop}>My Profile</p>
          <BiChevronRight size={18} fill='#000' />
          <p className={styles.pageSubtitleTop}>Edit Profile</p>
        </div>
        <div className={styles.topLeftWrapper}>
          <ActionBtn
            title='Save'
            icon={<AiOutlineArrowRight size={18} fill='#000' />}
            actionFunction={() => handleUpdateUserInfo()}
          />
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <Avatar sx={{ height: 120, width: 120 }} />
        <div className={styles.inputWrapper}>
          <InputBox
            value={name}
            setValue={setName}
            placeholder='Enter the name of the company'
            label='Company Name'
          />
          <InputBox
            value={email}
            setValue={setEmail}
            placeholder='Enter the email of the company'
            label='Email'
          />
          <InputBox
            value={webUrl}
            setValue={setWebUrl}
            placeholder='Enter the web url of the company'
            label='Web Url'
          />
          <InputBox
            value={location}
            setValue={setLocation}
            placeholder='Enter the location of the company'
            label='Location'
          />
        </div>
      </div>
    </div>
  );
}

export default page;
