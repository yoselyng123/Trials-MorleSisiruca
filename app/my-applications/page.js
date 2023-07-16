'use client';
import React, { useEffect, useState } from 'react';
import styles from './myApplications.module.css';
import { getApplicationByUserId } from '@/src/firebase/firestore/application';
import { useAuthContext } from '@/src/context/AuthContext';
import { getJobById } from '@/src/firebase/firestore/job';
import Application from '../components/Application/Application';

function page() {
  const { user } = useAuthContext();

  const [listOfJobOffers, setListOfJobOffers] = useState([]);
  const [listOfApplications, setListOfApplications] = useState([]);
  const [filteredListOfApplications, setFilteredListOfApplications] = useState(
    []
  );

  const [applicationsApplied, setApplicationsApplied] = useState([]);
  const [applicationsClosed, setApplicationsClosed] = useState([]);
  const [currentPagination, setCurrentPagination] = useState('Applied');

  useEffect(() => {
    if (user) {
      getMyApplications();
    }
  }, [user]);

  const getMyApplications = async () => {
    const { applicationsListRef, errorGet } = await getApplicationByUserId(
      user.uid
    );

    if (applicationsListRef) {
      setListOfApplications(applicationsListRef);

      var copyOfListJobOffers = [];
      var copyOfClosed = [];
      var copyOfApplied = [];
      for (let i = 0; i < applicationsListRef.length; i++) {
        const jobOfferId = applicationsListRef[i].jobOfferId;

        const { docRef, errorGet } = await getJobById(jobOfferId);
        if (docRef) {
          if (applicationsListRef[i].stage === 'closed') {
            copyOfClosed.push({
              jobOffer: docRef,
              application: applicationsListRef[i],
            });
          } else {
            copyOfApplied.push({
              jobOffer: docRef,
              application: applicationsListRef[i],
            });
          }
        }
      }

      setApplicationsClosed(copyOfClosed);
      setApplicationsApplied(copyOfApplied);
      setFilteredListOfApplications(copyOfApplied);
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Applications</h4>
      {/* Pagination */}
      <div className={styles.paginationListWrapper}>
        <button
          className={styles.paginationWrapper}
          onClick={() => {
            setCurrentPagination('Applied');
            setFilteredListOfApplications(applicationsApplied);
          }}
          style={
            currentPagination === 'Applied'
              ? { borderBottom: '2px solid #D4B200' }
              : { borderBottom: '2px solid transparent' }
          }
        >
          <p className={styles.paginationText}>Applied</p>
        </button>
        <button
          className={styles.paginationWrapper}
          onClick={() => {
            setCurrentPagination('Closed');
            setFilteredListOfApplications(applicationsClosed);
          }}
          style={
            currentPagination === 'Closed'
              ? { borderBottom: '2px solid #D4B200' }
              : { borderBottom: '2px solid transparent' }
          }
        >
          <p className={styles.paginationText}>Closed</p>
        </button>
      </div>
      {/* Jobs List */}
      <div className={styles.counterWrapper}>
        <p className={styles.totalCandidatesText}>Total Applications</p>
        <div className={styles.counterNumberWrapper}>
          <p className={styles.numberText}>
            {filteredListOfApplications.length}
          </p>
        </div>
      </div>
      <div className={styles.jobsListWrapper}>
        {filteredListOfApplications.length > 0 ? (
          filteredListOfApplications.map((job, index) => (
            <Application
              jobOffer={job.jobOffer}
              key={index}
              application={job.application}
            />
          ))
        ) : (
          <p className={styles.noResultText}>No results</p>
        )}
      </div>
    </div>
  );
}

export default page;
