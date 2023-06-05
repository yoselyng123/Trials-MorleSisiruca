import { useState, useEffect } from 'react';
import styles from './profileAvatar.module.css';
import { useAuthContext } from '@/src/context/AuthContext';

function ProfileAvatar({ profilePic, setProfilePic, picture, setPicture }) {
  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPicture(e.target.files[0]);
    }
  };

  return (
    <div className={styles.personalImage}>
      <label className={styles.label}>
        <input type='file' onChange={handleProfilePicChange} />
        <figure className={styles.personalFigure}>
          <img
            src={profilePic !== '' ? profilePic : defaultAvatar}
            className={styles.personalAvatar}
            alt='avatar'
          />
          <figcaption className={styles.personalFigcaption}>
            <img src='https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png' />
          </figcaption>
        </figure>
      </label>
    </div>
  );
}

export default ProfileAvatar;
