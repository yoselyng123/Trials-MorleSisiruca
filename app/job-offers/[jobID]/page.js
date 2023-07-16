'use client';
import React, { useEffect, useState } from 'react';
import styles from './jobId.module.css';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/firebase/firebase.config';
import CandidateTableElement from '@/app/components/CandidateTableElement/CandidateTableElement';
import { getApplicationByJobOfferId } from '@/src/firebase/firestore/application';
import Modal from '@/app/components/Modal/Modal';
import UserPreview from '@/app/components/UserPreview/UserPreview';
import EmailForm from '@/app/components/EmailForm/EmailForm';

function page({ params }) {
  const [jobOffer, setJobOffer] = useState(null);
  const [listOfApplications, setListOfApplications] = useState([]);
  const [userPreviewInfo, setUserPreviewInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEmailOpen, setModalEmailOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const jobID = params.jobID.split('%')[0];

    const documentRef = doc(db, 'jobOffers', jobID);

    const unsubscribe = onSnapshot(
      documentRef,
      async (doc) => {
        if (doc.exists()) {
          await handleGetApplications(doc.id);
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

  const handleGetApplications = async (jobOfferId) => {
    const { applicationsListRef, errorGet } = await getApplicationByJobOfferId(
      jobOfferId
    );

    if (applicationsListRef) {
      setListOfApplications(applicationsListRef);
    } else {
      console.log('ERROR GETTING APPLICATIONS LIST');
    }
  };

  if (jobOffer && listOfApplications) {
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
              <div className={styles.sectionWrapper}>
                <p className={styles.highlightText}>Email</p>
              </div>
            </div>
            <div className={styles.tableContent}>
              {listOfApplications &&
                listOfApplications.map((application, index) => (
                  <CandidateTableElement
                    application={application}
                    key={index}
                    jobOffer={jobOffer}
                    setUserPreviewInfo={setUserPreviewInfo}
                    setModalOpen={setModalOpen}
                    setModalEmailOpen={setModalEmailOpen}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Modal User Preview*/}
        {modalOpen && userPreviewInfo && (
          <Modal
            setIsOpen={setModalOpen}
            modalContent={
              <UserPreview
                clickedUser={userPreviewInfo.user}
                cvURL={userPreviewInfo.cvURL}
                hasCV={true}
              />
            }
          />
        )}
        {/* Modal Email*/}
        {modalEmailOpen && userPreviewInfo && (
          <Modal
            setIsOpen={setModalEmailOpen}
            modalContent={<EmailForm userInfo={userPreviewInfo.user} />}
          />
        )}
      </div>
    );
  }
}

export default page;
