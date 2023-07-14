import { useState, useEffect } from 'react';
import styles from './profileAvatar.module.css';
import { useAuthContext } from '@/src/context/AuthContext';
import Image from 'next/image';

function ProfileAvatar({ profilePic, setProfilePic, picture, setPicture }) {
  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  const [imagePreview, setImagePreview] = useState(null);

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPicture(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={styles.personalImage}>
      <label className={styles.label}>
        <input type='file' onChange={handleProfilePicChange} />
        <figure className={styles.personalFigure}>
          {!imagePreview || !picture ? (
            <img
              src={profilePic !== '' ? profilePic : defaultAvatar}
              className={styles.personalAvatar}
              alt='avatar'
            />
          ) : (
            <Image
              src={imagePreview}
              className={styles.personalAvatar}
              alt='avatar'
              width={110}
              height={110}
            />
          )}

          <figcaption className={styles.personalFigcaption}>
            <Image
              src='https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png'
              width={110}
              height={110}
            />
          </figcaption>
        </figure>
      </label>
    </div>
  );
}

export default ProfileAvatar;
