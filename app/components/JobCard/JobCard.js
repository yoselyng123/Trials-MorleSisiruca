import React, { useEffect, useState } from 'react';
import styles from './jobCard.module.css';

import { BsFillPersonVcardFill } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { GoChevronRight } from 'react-icons/go';
import { AiFillEdit } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

function JobCard({ job, setClickedJob, setModalOpen }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.topInfoWrapper}>
        <div className={styles.topInfoLeftWrapper}>
          <p className={styles.jobCategoryText}>{job.jobCategories[0]}</p>
          <p className={styles.jobTitleText}>{job.title}</p>
        </div>
        <div
          className={styles.cvIconAddWrapper}
          onClick={() => {
            setModalOpen(true);
            setClickedJob(job);
          }}
        >
          <AiFillEdit size={20} color='rgba(0,0,0,0.4)' />
        </div>
      </div>
      <div className={styles.candidatesWrapper}>
        <p className={styles.candidatesText}>Candidates:</p>
        <div className={styles.infoCandidatesWrapper}>
          {job.applicants.length > 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: '1',
              }}
            >
              <div className={styles.candidatesCounterWrapper}>
                <p className={styles.candidatesTotaltext}>TOTAL</p>
                <p className={styles.candidatesCounterText}>
                  {job.applicants.length}
                </p>
              </div>
              <div
                className={styles.candidatesCounterWrapper}
                style={{ borderLeft: '2.5px solid #2D8EFF' }}
              >
                <p className={styles.candidatesTotaltext}>NEW</p>
                <p className={styles.candidatesCounterText}>
                  {job.applicants.length}
                </p>
              </div>
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
        <div
          className={styles.jobDetailsWrapper}
          onClick={() => {
            router.push(`/job-offers/${job.id}}`);
          }}
        >
          <p className={styles.jobStateText}>See Details</p>
          <GoChevronRight size={20} color='rgba(0, 0, 0, 0.6)' />
        </div>
      </div>
    </div>
  );
}

export default JobCard;
