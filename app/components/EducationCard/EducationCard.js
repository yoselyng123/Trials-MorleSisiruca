import React from 'react';
import styles from './educationCard.module.css';
import { BiPencil } from 'react-icons/bi';

function EducationCard({
  education,
  setClickedEducation,
  setModalOpen,
  setClickedType,
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainerLeft}>
        <p className={styles.title}>{education.schoolName}</p>
        <p className={styles.subtitle}>{education.fieldOfStudy}</p>

        <p
          className={styles.date}
        >{`${education.startMonth} ${education.startYear} - ${education.endMonth} ${education.endYear}`}</p>
        <p className={styles.date}>{education.location}</p>
      </div>
      <div className={styles.cardContainerRight}>
        <div className={styles.cvIconAddWrapper}>
          <BiPencil
            size={20}
            color='rgba(0,0,0,0.4)'
            onClick={() => {
              setClickedEducation(education);
              setModalOpen(true);
              setClickedType('edit');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
