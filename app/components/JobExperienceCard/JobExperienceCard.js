import React from 'react';
import styles from './jobExperienceCard.module.css';
import { BiPencil } from 'react-icons/bi';

function JobExperienceCard({
  jobExperience,
  setClickedJobExperience,
  setModalOpen,
  setClickedType,
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainerLeft}>
        <p className={styles.title}>{jobExperience.companyName}</p>
        <p className={styles.subtitle}>
          {jobExperience.title} ({jobExperience.jobType})
        </p>
        <p
          className={styles.date}
        >{`${jobExperience.startMonth} ${jobExperience.startYear} - ${jobExperience.endMonth} ${jobExperience.endYear}`}</p>
        <p className={styles.date}>{jobExperience.location}</p>
      </div>
      <div className={styles.cardContainerRight}>
        <div className={styles.cvIconAddWrapper}>
          <BiPencil
            size={20}
            color='rgba(0,0,0,0.4)'
            onClick={() => {
              setClickedJobExperience(jobExperience);
              setModalOpen(true);
              setClickedType('edit');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default JobExperienceCard;
