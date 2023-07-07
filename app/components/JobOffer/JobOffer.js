import React, { useState } from 'react';
import styles from './jobOffer.module.css';
import { MdPeopleAlt } from 'react-icons/md';
import ReactTimeago from 'react-timeago';
import { useEffect } from 'react';
import { getCompany } from '@/src/firebase/auth/signup';

function JobOffer({ job, setModalOpen, setClickedCompany, setClickedJob }) {
  const [companyInfo, setCompanyInfo] = useState('');

  useEffect(() => {
    handleGetCompanyName();
  }, []);

  const handleGetCompanyName = async () => {
    const { userRef, errorGet } = await getCompany(job.companyID);
    if (userRef) {
      setCompanyInfo(userRef);
    } else {
      console.log('JOBOFFER: ERROR GETTING COMPANY INFO');
    }
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        setClickedCompany(companyInfo);
        setClickedJob(job);
        setModalOpen(true);
      }}
    >
      <div className={styles.leftContainer}>
        <img
          src={companyInfo.profilePic}
          className={styles.personalAvatar}
          alt='avatar'
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.infoTopContainer}>
          <p className={styles.jobTitle}>{job.title}</p>
          <ReactTimeago
            date={job.publishedDate}
            style={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#9596AA',
            }}
          />
        </div>
        <div className={styles.infoMidContainer}>
          <div className={styles.companyNameWrapper}>
            <p className={styles.companyName}>{companyInfo.name}</p>
          </div>
          <div className={styles.companyExtraInfoWrapper}>
            <div className={styles.companySizeWrapper}>
              <MdPeopleAlt size={16} fill='#9596AA' />
              <p className={styles.complementaryText}>
                {companyInfo.companySize}
              </p>
            </div>
            <p className={styles.complementaryText}> $ {job.paymentRange}</p>
          </div>
        </div>
        <div className={styles.tagsWrapper}>
          <div className={styles.tagContainerTime}>
            <div className={styles.circleTime} />
            <p className={styles.tagTitle}>{job.jobType}</p>
          </div>
          {job.jobCategories?.map((category, index) => {
            if (index <= 1) {
              return (
                <div className={styles.tagContainerArea} key={index}>
                  <div className={styles.circleArea} />
                  <p className={styles.tagTitle}>{category}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default JobOffer;
