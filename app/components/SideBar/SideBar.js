'use client';
import styles from './sideBar.module.css';
import { BiNetworkChart } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import { HiInboxArrowDown } from 'react-icons/hi2';
import { RiSuitcaseFill, RiEditBoxFill } from 'react-icons/ri';
import { BsPeopleFill, BsBellFill } from 'react-icons/bs';
import { IoEnter } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { useAuthContext } from '@/src/context/AuthContext';
import SideOption from '../SideOption/SideOption';
import { auth } from '@/src/firebase/firebase.config';

function SideBar() {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.titleWrapper}>
          <BiNetworkChart size={45} fill='#FFD731' />
          <h2 className={styles.title}>Trials</h2>
        </div>

        <SideOption
          title='Dashboard'
          icon={<MdSpaceDashboard size={20} fill='#7C8AA3' />}
          link='/dashboard'
        />
        {user && (
          <SideOption
            title='Profile'
            icon={<CgProfile size={20} color='#7C8AA3' />}
            link='/profile'
          />
        )}

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
      </div>
      <div>
        {user ? (
          <button onClick={() => auth.signOut()}>Sign Out</button>
        ) : (
          //   <SideOption
          //     title='Sign out'
          //     icon={<IoEnter size={20} fill='#000' />}
          //     primary={true}
          //     link='/'
          //   />
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
              icon={<RiEditBoxFill size={20} fill='#7C8AA3' />}
              link='sign-up-company'
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
