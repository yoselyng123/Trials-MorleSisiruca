import React from 'react';
import styles from './cVSelector.module.css';
import { useAuthContext } from '@/src/context/AuthContext';
import ActionBtn from '../ActionBtn/ActionBtn';
import { handleJobApply } from '@/src/firebase/firestore/job';

function CVSelector({
  selectedCVUrl,
  setSelectedCVUrl,
  clickedJob,
  setIsModalCVOpen,
  setApplyBtnClicked,
  applyBtnClicked,
}) {
  const { user } = useAuthContext();

  const handlegetFileName = (cv) => {
    let match = cv.match(/\/([^\/?]*)(\?|$)/);
    if (match) {
      let filename = decodeURIComponent(match[1]); // This will give '8Iy8yCzFXPeHDT2F1VdgBhV2IWf2_2023-07-11T19:18:53.279Z.pdf'
      return filename.split('/')[1];
    } else {
      return null;
    }
  };

  const handleApply = async () => {
    console.log(checkIfUserHasAppliedAlready());
    if (
      clickedJob.applicants.length < clickedJob.applicantLimit &&
      selectedCVUrl !== ''
    ) {
      await handleJobApply(clickedJob, {
        cv: selectedCVUrl,
        userId: user.uid,
      });
      setIsModalCVOpen(false);
      alert('You have applied to this job succesfully!');
      setApplyBtnClicked(!applyBtnClicked);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Select a cv to apply</p>
      <div className={styles.cvListWrapper}>
        {user?.adjCvList.map((cv, index) => (
          <div className={styles.cvOption} key={index}>
            <input
              type='checkbox'
              name={cv}
              value={cv}
              checked={selectedCVUrl === cv}
              onChange={() => setSelectedCVUrl(cv)}
            />
            <p className={styles.cvText}>{handlegetFileName(cv)}</p>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <ActionBtn title='Apply' actionFunction={() => handleApply()} />
      </div>
    </div>
  );
}

export default CVSelector;
