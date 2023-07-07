import React, { useEffect, useState } from 'react';
import styles from './jobCard.module.css';

import { BsFillPersonVcardFill } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { GoChevronRight } from 'react-icons/go';

function JobCard({ job, setClickedJob, setModalOpen }) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        setModalOpen(true);
        setClickedJob(job);
      }}
    >
      <div className={styles.topInfoWrapper}>
        <p className={styles.jobCategoryText}>{job.jobCategories[0]}</p>
        <p className={styles.jobTitleText}>{job.title}</p>
      </div>
      <div className={styles.candidatesWrapper}>
        <p className={styles.candidatesText}>Candidates:</p>
        <div className={styles.infoCandidatesWrapper}>
          {job.applicants.length > 0 ? (
            <div className={styles.candidatesCounterWrapper}>
              <p className={styles.candidatesTotaltext}>TOTAL</p>
              <p className={styles.candidatesCounterText}>
                {job.applicants.length}
              </p>
            </div>
          ) : (
            <div className={styles.iconCandidatesWrapper}>
              <BsFillPersonVcardFill size={40} color='rgba(0,0,0,0.6)' />
            </div>
          )}
        </div>
      </div>
      <div className={styles.jobTypeWrapper}>
        <p className={styles.jobTypeText}>{job.jobType}</p>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.jobStateWrapper}>
          <TbWorld size={20} color='rgba(0, 0, 0, 0.6)' />
          <p className={styles.jobStateText}>Published</p>
        </div>
        <div className={styles.jobStateWrapper}>
          <p className={styles.jobStateText}>See Details</p>
          <GoChevronRight size={20} color='rgba(0, 0, 0, 0.6)' />
        </div>
      </div>
    </div>
  );
}

export default JobCard;
