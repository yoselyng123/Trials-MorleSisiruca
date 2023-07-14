'use client';
import React, { useEffect, useState } from 'react';
import styles from './jobId.module.css';
import Filter from '@/app/components/Filter/Filter';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/firebase/firebase.config';
import CandidateTableElement from '@/app/components/CandidateTableElement/CandidateTableElement';

function page({ params }) {
  const [numberOfItems, setNumberOfItems] = useState(5);

  const [jobOffer, setJobOffer] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const jobID = params.jobID.split('%')[0];

    const documentRef = doc(db, 'jobOffers', jobID);

    const unsubscribe = onSnapshot(
      documentRef,
      (doc) => {
        if (doc.exists()) {
          setJobOffer({ id: doc.id, ...doc.data() });
        } else {
          console.log('No such document!');
        }
      },
      (error) => {
        console.log('Error getting document:', error);
      }
    );

    return unsubscribe;
  }, [params]);

  if (jobOffer) {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.topSection}>
            <div className={styles.iconWrapper} onClick={() => router.back()}>
              <IoChevronBackOutline color='#000' size={16} />
            </div>
            <div className={styles.topInfoWrapper}>
              <p className={styles.jobCategoryText}>
                {jobOffer.jobCategories[0]}
              </p>
              <p className={styles.jobTitleText}>{jobOffer.title}</p>
              <p className={styles.jobTypeText}>{jobOffer.jobType}</p>
            </div>
          </div>
          <div className={styles.counterWrapper}>
            <p className={styles.totalCandidatesText}>Total Candidates</p>
            <div className={styles.counterNumberWrapper}>
              <p className={styles.numberText}>{jobOffer.applicants.length}</p>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div className={styles.sectionWrapper}>
                <p className={styles.highlightText}>Candidate Name</p>
              </div>
              <div className={styles.sectionWrapper}>
                <p className={styles.highlightText}>Applied Date</p>
              </div>
              <div className={styles.sectionWrapper}>
                <p className={styles.highlightText}>CV</p>
              </div>
              <div className={styles.sectionWrapper}>
                <p className={styles.highlightText}>Stage</p>
              </div>
            </div>
            <div className={styles.tableContent}>
              {jobOffer.applicants.map((application, index) => (
                <CandidateTableElement application={application} />
              ))}
            </div>
          </div>
        </div>
        {/* <div className={styles.footer}>
            <div className={styles.viewContentWrapper}>
              <p> View</p>
              <Filter
                title='5'
                icon={<div></div>}
                setSelectedOption={setNumberOfItems}
                selectedOption={numberOfItems}
              />
              <p className={styles.jobTypeText}>Candidates per page</p>
            </div>
          </div> */}
      </div>
    );
  } else {
    return null;
  }
}

export default page;
