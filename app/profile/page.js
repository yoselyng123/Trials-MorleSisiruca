'use client';
import styles from './profile.module.css';
import { Avatar } from '@mui/material';
import { BiChevronRight } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import ActionBtn from '../components/ActionBtn/ActionBtn';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/src/context/AuthContext';
import { updateUserCompany } from '@/src/firebase/auth/signup';
import DataCompany from '../components/DataCompany/DataCompany';
import DataUser from '../components/DataUser/DataUser';

function page() {
  const [saveBtnClick, setSaveBtnClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      console.log(user.role);
    }
  }, []);

  const inputValidations = () => {
    // TODO: input validations
    return true;
  };

  const handleProfilePicChange = () => {};

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.topWrapper}>
          <div className={styles.topLeftWrapper}>
            <p className={styles.pageTitleTop}>My Profile</p>
            <BiChevronRight size={18} fill='#000' />
            <p className={styles.pageSubtitleTop}>Edit Profile</p>
          </div>
          <div className={styles.topRightWrapper}>
            <ActionBtn
              title='Save'
              icon={<AiOutlineArrowRight size={18} fill='#000' />}
              actionFunction={() => setSaveBtnClick(true)}
              disabled={loading}
            />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.inputWrapper}>
            {user.role === 'Professional' ? (
              <DataUser
                saveBtnClick={saveBtnClick}
                setSaveBtnClick={setSaveBtnClick}
                loading={loading}
                setLoading={setLoading}
              />
            ) : user.role === 'Company' ? (
              <DataCompany
                saveBtnClick={saveBtnClick}
                setSaveBtnClick={setSaveBtnClick}
                loading={loading}
                setLoading={setLoading}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default page;
