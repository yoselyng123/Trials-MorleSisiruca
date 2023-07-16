import React, { useEffect, useState } from 'react';
import styles from './application.module.css';
import { getCompany } from '@/src/firebase/auth/signup';
import ReactTimeago from 'react-timeago';

function Application({ jobOffer, application }) {
  const [stateText, setStateText] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');

  useEffect(() => {
    if (application) {
      handleState();
    }
    handleGetCompanyName();
  }, []);

  useEffect(() => {
    handleState();
  }, [application.stage]);

  const handleState = () => {
    if (application.stage === 'new') {
      setStateText('Applied');
    } else if (application.stage === 'cv seen') {
      setStateText('CV Seen');
    } else if (application.stage === 'in process') {
      setStateText('In Process');
    } else {
      setStateText('Ended Process');
    }
  };

  const handleGetCompanyName = async () => {
    const { userRef, errorGet } = await getCompany(jobOffer.companyID);
    if (userRef) {
      setCompanyInfo(userRef);
    } else {
      console.log('JOBOFFER: ERROR GETTING COMPANY INFO');
    }
  };
  if (companyInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <p className={styles.jobTitle}>{jobOffer.title}</p>
          <p className={styles.companyName}>{companyInfo.name}</p>
        </div>
        <div className={styles.rightContainer}>
          <p className={styles.stateText}>{stateText}</p>
          <ReactTimeago
            date={application.dateApplied}
            className={styles.applicantsQuantity}
          />
          <p className={styles.applicantsQuantity}>
            {jobOffer.applicants.length} candidates
          </p>
        </div>
      </div>
    );
  }
}

export default Application;
