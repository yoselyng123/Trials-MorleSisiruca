import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './candidateTableElement.module.css';
import { getUserByID } from '@/src/firebase/auth/signup';

function CandidateTableElement({ application }) {
  const [userInfo, setUserInfo] = useState(null);

  const defaultAvatar =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  const handleGetUserInfo = async () => {
    const { userRef, errorGet } = await getUserByID(application.userId);

    if (userRef) {
      setUserInfo(userRef);
    }
  };

  const handlePreview = () => {
    //TODO: Update state of application
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

  if (userInfo) {
    return (
      <div className={styles.tableElement}>
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
          <p className={styles.userNameText}>{application.dateApplied}</p>
        </div>
        <div className={styles.sectionContentWrapper}>
          <p className={styles.cvText} onClick={handlePreview}>
            View CV
          </p>
        </div>
        <div className={styles.sectionContentWrapper}>
          <p className={styles.stageText}>New Applied</p>
          <div className={styles.circle} />
        </div>
      </div>
    );
  }
}

export default CandidateTableElement;
