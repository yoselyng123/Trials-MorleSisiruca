import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './candidateTableElement.module.css';
import { getUserByID } from '@/src/firebase/auth/signup';
import { updateApplicationStageById } from '@/src/firebase/firestore/application';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/firebase/firebase.config';
import { createNotification } from '@/src/firebase/firestore/notifications';
import { IoMail } from 'react-icons/io5';

function CandidateTableElement({
  application,
  jobOffer,
  setUserPreviewInfo,
  setModalOpen,
  setModalEmailOpen,
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [applicationSnapshot, setApplicationSnapshot] = useState(null);
  const [stageText, setStageText] = useState('New applicant');

  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  useEffect(() => {
    const documentRef = doc(db, 'Applications', application.id);

    const unsubscribe = onSnapshot(
      documentRef,
      async (doc) => {
        if (doc.exists()) {
          setApplicationSnapshot({ id: doc.id, ...doc.data() });
          setStageText(doc.data().stage);
        } else {
          console.log('No such document!');
        }
      },
      (error) => {
        console.log('Error getting document:', error);
      }
    );

    return unsubscribe;
  }, []);

  const handleGetUserInfo = async () => {
    const { userRef, errorGet } = await getUserByID(application.userId);

    if (userRef) {
      setUserInfo(userRef);
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

  const handlePreview = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    if (applicationSnapshot.stage === 'new') {
      await updateApplicationStageById(application.id, 'cv seen');

      await createNotification({
        message: `The state of your application for: ${jobOffer.title} has been updated`,
        title: 'Application Updated',
        state: 'Nuevo',
        sender: jobOffer.companyID,
        receiver: userInfo.uid,
        created: getCurrentDateTime(),
        jobOfferId: jobOffer.id,
      });
    }

    openInNewTab(
      <embed
        type='application/pdf'
        width={100 + '%'}
        src={application.cv}
        height={100 + '%'}
      />
    );
    // setViewPDF(true);
  };

  function openInNewTab(component) {
    const newWindow = window.open('', '_blank');

    newWindow.document.body.style.margin = '0';

    ReactDOM.render(component, newWindow.document.body);
  }

  const handleFormatDate = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = application.dateApplied.split(' ')[0];

    return `${date.split('-')[2]} ${months[Number(date.split('-')[1])]}, ${
      date.split('-')[0]
    }`;
  };

  const handleEmail = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setUserPreviewInfo({ user: userInfo, cvURL: application.cv });
    setModalEmailOpen(true);
  };

  if (userInfo) {
    return (
      <div
        className={styles.tableElement}
        onClick={() => {
          setUserPreviewInfo({ user: userInfo, cvURL: application.cv });
          setModalOpen(true);
        }}
      >
        <div className={styles.sectionContentWrapper}>
          <img
            className={styles.profilePic}
            src={userInfo?.profilePic ? userInfo.profilePic : defaultAvatar}
          />
          <p
            className={styles.userNameText}
          >{`${userInfo.name} ${userInfo.lastname}`}</p>
        </div>
        <div className={styles.sectionContentWrapper}>
          <p className={styles.userNameText}>{handleFormatDate()}</p>
        </div>
        <div className={styles.sectionContentWrapper}>
          <p className={styles.cvText} onClick={handlePreview}>
            View CV
          </p>
        </div>
        <div className={styles.sectionContentWrapper}>
          <p className={styles.stageText}>{stageText}</p>
          {applicationSnapshot?.stage === 'new' && (
            <div className={styles.circle} />
          )}
        </div>
        <div className={styles.sectionContentWrapper}>
          <div className={styles.iconWrapper} onClick={(e) => handleEmail(e)}>
            <IoMail size={20} color='rgba(0,0,0,0.5)' />
          </div>
        </div>
      </div>
    );
  } else {
    return <p>No user</p>;
  }
}

export default CandidateTableElement;
