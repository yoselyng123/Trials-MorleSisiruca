import React from 'react';
import styles from './cVSelector.module.css';
import { useAuthContext } from '@/src/context/AuthContext';
import ActionBtn from '../ActionBtn/ActionBtn';
import { updateJobState } from '@/src/firebase/firestore/job';
import { handleJobApply } from '@/src/firebase/firestore/application';
import { createNotification } from '@/src/firebase/firestore/notifications';

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

  const getCurrentDateTime = () => {
    var now = new Date();

    var year = now.getFullYear();

    var month = now.getMonth() + 1; // JavaScript months are 0-11
    month = (month < 10 ? '0' : '') + month; // add a zero if it's only one digit

    var day = now.getDate();
    day = (day < 10 ? '0' : '') + day; // add a zero if it's only one digit

    var hour = now.getHours();
    hour = (hour < 10 ? '0' : '') + hour; // add a zero if it's only one digit

    var minute = now.getMinutes();
    minute = (minute < 10 ? '0' : '') + minute; // add a zero if it's only one digit

    var second = now.getSeconds();
    second = (second < 10 ? '0' : '') + second; // add a zero if it's only one digit

    return (
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    );
  };

  const handleApply = async () => {
    if (selectedCVUrl === '') {
      alert('You need a CV to apply to a job');
    } else {
      if (
        clickedJob.applicants.length < clickedJob.applicantLimit &&
        selectedCVUrl !== ''
      ) {
        await handleJobApply({
          cv: selectedCVUrl,
          userId: user.uid,
          jobOfferId: clickedJob.id,
          companyId: clickedJob.companyID,
          stage: 'new', // new | in process | closed
          dateApplied: getCurrentDateTime(),
        });

        await createNotification({
          message: `Ha recibido un nuevo cv para la oferta de empleo: ${clickedJob.title}`,
          title: 'Nuevo CV',
          state: 'Nuevo',
          sender: user.uid,
          receiver: clickedJob.companyID,
          created: getCurrentDateTime(),
          jobOfferId: clickedJob.id,
        });

        if (clickedJob.applicantLimit - 1 === clickedJob.applicants.length) {
          updateJobState(clickedJob, 'closed');
        }
        setIsModalCVOpen(false);
        alert('You have applied to this job succesfully!');
        setApplyBtnClicked(!applyBtnClicked);
      }
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
