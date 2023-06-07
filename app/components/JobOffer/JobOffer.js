import React from 'react';
import styles from './jobOffer.module.css';
import { MdPeopleAlt } from 'react-icons/md';

function JobOffer() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img
          src='https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-square-avatar-halloween-175916751.jpg'
          className={styles.personalAvatar}
          alt='avatar'
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.infoTopContainer}>
          <p className={styles.jobTitle}>Frontend Developer</p>
          <p className={styles.publicationTime}>2 hours ago</p>
        </div>
        <div className={styles.infoMidContainer}>
          <div className={styles.companyNameWrapper}>
            <p className={styles.companyName}>Company Name</p>
          </div>
          <div className={styles.companyExtraInfoWrapper}>
            <div className={styles.companySizeWrapper}>
              <MdPeopleAlt size={16} fill='#9596AA' />
              <p className={styles.complementaryText}>11-50</p>
            </div>
            <p className={styles.complementaryText}> $ 80k-100k</p>
          </div>
        </div>
        <div className={styles.tagsWrapper}>
          <div className={styles.tagContainerTime}>
            <div className={styles.circleTime} />
            <p className={styles.tagTitle}>Full-Time</p>
          </div>
          <div className={styles.tagContainerArea}>
            <div className={styles.circleArea} />
            <p className={styles.tagTitle}>Software developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobOffer;
