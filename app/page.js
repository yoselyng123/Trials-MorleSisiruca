'use client';
import { useAuthContext } from '@/src/context/AuthContext';
import styles from './page.module.css';
import { auth } from '@/src/firebase/firebase.config';
import { useEffect, useState } from 'react';
import JobOffer from './components/JobOffer/JobOffer';
import { getJobsList } from '@/src/firebase/firestore/job';
import Modal from './components/Modal/Modal';

export default function Home() {
  const { user } = useAuthContext();

  const [jobsList, setJobsList] = useState([]);
  const [clickedCompany, setClickedCompany] = useState({});
  const [clickedJob, setClickedJob] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    handleGetJobsList();
  }, []);

  const handleGetJobsList = async () => {
    const { jobsListRef, errorGet } = await getJobsList();

    if (jobsListRef) {
      setJobsList(jobsListRef);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        {jobsList.length > 0 ? (
          jobsList.map((job, index) => (
            <JobOffer
              key={index}
              job={job}
              setModalOpen={setModalOpen}
              setClickedCompany={setClickedCompany}
              setClickedJob={setClickedJob}
            />
          ))
        ) : (
          <p>NO JOBS</p>
        )}
      </div>
      {modalOpen && clickedCompany && clickedJob && (
        <Modal
          setIsOpen={setModalOpen}
          clickedCompany={clickedCompany}
          clickedJob={clickedJob}
        />
      )}
    </main>
  );
}
