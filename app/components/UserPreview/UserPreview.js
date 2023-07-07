import React from 'react';
import styles from './userPreview.module.css';
import ListExpertiseCategories from '../ListExpertiseCategories/ListExpertiseCategories';

function UserPreview({ clickedUser }) {
  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  return (
    <div className={styles.container}>
      <img
        src={clickedUser?.profilePic ? clickedUser?.profilePic : defaultAvatar}
        alt='avatar'
        className={styles.profileAvatar}
      />
      <div className={styles.topInfoWrapper}>
        <p
          className={styles.userNameText}
        >{`${clickedUser.name} ${clickedUser.lastname}`}</p>
        <p className={styles.infoText}>{`${clickedUser.description}`}</p>
        <p className={styles.locationText}>{`${clickedUser.location}`}</p>
        <div className={styles.contactWrapper}>
          <p className={styles.subtitleText}>Contact Info</p>
          <p className={styles.infoText}>
            {' '}
            <span className={styles.locationText}> Email: </span>
            {clickedUser.email}
          </p>
        </div>
      </div>
      <ListExpertiseCategories
        title={'Expertise Areas'}
        listElements={clickedUser.listExpertiseAreas}
      />
      <ListExpertiseCategories
        title={'Job Categories'}
        listElements={clickedUser.jobCategories}
      />
    </div>
  );
}

export default UserPreview;
