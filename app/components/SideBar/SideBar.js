'use client';
import styles from './sideBar.module.css';
import { BiNetworkChart } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { HiInboxArrowDown } from 'react-icons/hi2';
import {
  RiSuitcaseFill,
  RiEditBoxFill,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import {
  BsPeopleFill,
  BsBellFill,
  BsBuildingFillUp,
  BsFillBuildingFill,
} from 'react-icons/bs';
import { IoEnter } from 'react-icons/io5';
import { MdAddBox } from 'react-icons/md';
import { useAuthContext } from '@/src/context/AuthContext';
import SideOption from '../SideOption/SideOption';
import { auth } from '@/src/firebase/firebase.config';
import Image from 'next/image';

function SideBar() {
  const { user } = useAuthContext();

  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.titleWrapper}>
          <BiNetworkChart size={45} fill='#FFD731' />
          <h2 className={styles.title}>Trials</h2>
        </div>
        {(user?.role === 'Professional' || !user) && (
          <SideOption
            title='Home'
            icon={<AiFillHome size={20} fill='#7C8AA3' />}
            link='/'
          />
        )}
        {user && (
          <>
            <SideOption
              title='Profile'
              icon={
                <Image
                  src={user?.profilePic ? user?.profilePic : defaultAvatar}
                  className={styles.personalAvatar}
                  alt='avatar'
                  height={23}
                  width={23}
                />
              }
              link='/profile'
            />

            <SideOption
              title='Notifications'
              icon={<BsBellFill size={20} fill='#7C8AA3' />}
              link='/notifications'
            />
            <SideOption
              title='Inbox'
              icon={<HiInboxArrowDown size={20} fill='#7C8AA3' />}
              link='/inbox'
            />
          </>
        )}
        {user?.role === 'Professional' && (
          <>
            <SideOption
              title='Companies'
              icon={<BsFillBuildingFill size={20} fill='#7C8AA3' />}
              link='/companies'
            />
            <SideOption
              title='My Applications'
              icon={<RiSuitcaseFill size={20} fill='#7C8AA3' />}
              link='/my-applications'
            />
          </>
        )}

        {user?.role === 'Company' && (
          <>
            <p className={styles.subtitle}>RECRUITMENT</p>
            <SideOption
              title='Jobs'
              icon={<RiSuitcaseFill size={20} fill='#7C8AA3' />}
              link='/job-offers'
            />
            <SideOption
              title='Candidates'
              icon={<BsPeopleFill size={20} fill='#7C8AA3' />}
              link='/candidates'
            />
            <SideOption
              title='Create Job'
              icon={<MdAddBox size={20} fill='#7C8AA3' />}
              link='/create-job'
            />
          </>
        )}
      </div>
      <div>
        {user ? (
          <button className={styles.signOutBtn} onClick={() => auth.signOut()}>
            <RiLogoutBoxRLine size={20} fill='#000' />
            <p className={styles.signOutText}>Sign Out</p>
          </button>
        ) : (
          <>
            <SideOption
              title='Sign In'
              icon={<IoEnter size={20} fill='#000' />}
              primary={true}
              link='/sign-in'
            />
            <SideOption
              title='Sign Up'
              icon={<RiEditBoxFill size={20} fill='#7C8AA3' />}
              link='/sign-up'
            />
            <SideOption
              title='Sign Up Company'
              icon={<BsBuildingFillUp size={20} fill='#7C8AA3' />}
              link='sign-up-company'
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
